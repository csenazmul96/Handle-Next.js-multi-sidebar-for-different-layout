import { logout } from "@/utils/api/auth";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const authOptions = {
    useSecureCookies: false, // 👈 This disables the HTTPS-only flag on cookies
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: false, // 👈 This must also be false
            },
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials.username,
                                password: credentials.password,
                                redirect: false,
                                callbackUrl: "/",
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                        }
                    );

                    const user = await res.json();

                    if (res.ok && user) {
                        return user['data'];
                    }

                    return null
                } catch (error) {
                    throw new Error(error?.message ?? "Oops, something went wrong!");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user, account, profile, trigger, session}) {
            if (user) {
                token.token = user.access_token;
            }

            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }

            return token
        },
        async session({session, token}) {
            session.token = token.token;

            return session;
        }
    },
    events: {
        async signOut(message) {
            logout();
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
