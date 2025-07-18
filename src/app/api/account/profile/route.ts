/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { currentUser } from "@/lib/authentication";
import { prismadb } from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email } = body;

        const user = await currentUser();

        if (!name) {
            return NextResponse.json(
                { success: false, error: 'Name is required.' },
                { status: 400 }
            );
        };

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required.' },
                { status: 400 }
            );
        };

        if (!user || !user.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized." },
                { status: 401 },
            )
        };

        const updatedUser = await prismadb.user.update({
            where: {
                id: user.id,
            },
            data: {
                name,
                email,
            }
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error: any) {
        console.log("[PROFILE_POST]", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    };
};