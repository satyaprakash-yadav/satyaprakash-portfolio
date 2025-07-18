/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, confirmPassword } = body;

        if (!name) {
            return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 })
        };

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 })
        };

        if (!password) {
            return NextResponse.json({ success: false, error: "Password is required." }, { status: 400 })
        };

        if (!confirmPassword) {
            return NextResponse.json({ success: false, error: "Confirm Password is required." }, { status: 400 })
        };

        if (password !== confirmPassword) {
            return NextResponse.json({ success: false, error: "Passwords does not match." }, { status: 400 })
        }

        const userCount = await prismadb.user.count();

        if (userCount > 0) {
            return NextResponse.json({ success: false, error: "Cannot register." }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                hashedPassword,
                image: "",
            }
        });

        revalidatePath("/");
        
        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        console.error('[REGISTER_POST]', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
};
