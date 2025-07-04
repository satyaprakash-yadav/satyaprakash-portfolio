/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt, { compare } from "bcryptjs";
import { NextResponse } from "next/server";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { current, password, confirm } = body;

        // const session = await auth();
        const user = await currentUser()

        if (!current) {
            return NextResponse.json(
                { success: false, error: "Current password is required." },
                { status: 400 },
            );
        };

        if (!password) {
            return NextResponse.json(
                { success: false, error: "New password is required." },
                { status: 400 },
            );
        };

        if (!confirm) {
            return NextResponse.json(
                { success: false, error: "Confirm password is required." },
                { status: 400 },
            );
        };

        if (password !== confirm) {
            return NextResponse.json(
                { success: false, error: "Password does not match." },
                { status: 400 },
            );
        };

        if (!user || !user.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized." },
                { status: 401 },
            );
        };

        const loggedInUser = await prismadb.user.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!loggedInUser || !loggedInUser.hashedPassword) {
            return NextResponse.json(
                { success: false, error: "Account does not exist." },
                { status: 401 },
            );
        };

        const isCorrectPassword = await compare(
            current,
            loggedInUser.hashedPassword,
        );

        if (!isCorrectPassword) {
            return NextResponse.json(
                { success: false, error: "Wrong current password." },
                { status: 401 },
            );
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = await prismadb.user.update({
            where: {
                id: loggedInUser.id,
            },
            data: {
                hashedPassword,
            }
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error: any) {
        console.log("[PASSWORD_POST]", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        )
    }
}