"use server";

import {fetchRequest} from "@/utils/fetchRequest";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function logout() {
    const session = await getServerSession(authOptions);

    await fetchRequest(`/lms-registration-membership/api/v1/private/user/logout?refresh_token=${session.refresh_token}`, {
        method: 'POST'
    });
}

export async function validateToken() {
    const session = await getServerSession(authOptions);

    const req = await fetchRequest(`/lms-registration-membership/api/v1/private/user/validate/token`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${session?.token}`,
        },
        body: JSON.stringify({
            token: session?.token
        })
    });

    if(req.status !== 200){
        throw new Error('Invalid token');
    } else {
        const res = await req.json();
        if (res.active === false) {
            throw new Error('Invalid token');
        }
    }
}