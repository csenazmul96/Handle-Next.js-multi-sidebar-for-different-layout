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
                        `${process.env.NEXT_PUBLIC_API_URL}/lms-registration-membership/api/v1/public/admin/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                username: credentials.username,
                                password: credentials.password,
                                redirect: false,
                                callbackUrl: "/",
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                "x-forwarded-for": credentials.ip,
                                "user-agent": `${credentials.device} - ${credentials.browser}`,
                            },
                        }
                    );

                    const data = await res.json();

                    if (res.ok) {
                        const decodedToken = jwtDecode(data.data.access_token);
                        return {
                            scope: decodedToken.scope,
                            name: decodedToken.given_name,
                            email: decodedToken.email,
                            token: data.data.access_token,
                            refresh_token: data.data.refresh_token,
                            username: credentials.username,
                        };
                    } else {
                        const errorMessage = data.errors;
                        throw new Error(JSON.stringify(errorMessage));
                    }
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
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.scope = user.scope;
                token.token = user.token;
                token.refresh_token = user.refresh_token;
                token.username = user.username;
            }

            return token;
        },
        async session({ session, token }) {
            const decodedToken = jwtDecode(token.token);

            session.permissions = decodedToken?.realm_access?.roles || [];
            session.scope = token.scope;
            session.token = token.token;
            session.refresh_token = token.refresh_token;
            session.username = token.username;

            return session;
        },
    },
    events: {
        async signOut(message) {
            logout();
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
