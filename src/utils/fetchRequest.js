import { getSession } from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function fetchRequest(url, options = {}) {
    // Get the session, which contains the access token
    let session = null;

    if (typeof window === 'undefined') {
        session = await getServerSession(authOptions);
    } else {
        session = await getSession();
    }

    // Add the Authorization header with the Bearer token
    const headers = {
        Authorization: `Bearer ${session?.token}`,
        "Accept": "application/json",
        ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    // Merge the headers into the options
    const fetchOptions = {
        cache: 'no-store',
        ...options,
        headers,
    };

    try {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, fetchOptions );
    } catch (e){
        console.log(e.message)
    }
}