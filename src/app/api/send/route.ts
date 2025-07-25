/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend";
import { NextResponse } from "next/server";

import { EmailTemplate } from "@/modules/contact/ui/views/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name) {
            return NextResponse.json(
                { success: false, error: "Name is required." },
                { status: 400 },
            )
        }

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required." },
                { status: 400 },
            )
        }

        if (!subject) {
            return NextResponse.json(
                { success: false, error: "Subject is required." },
                { status: 400 },
            )
        }

        if (!message) {
            return NextResponse.json(
                { success: false, error: "Message is required." },
                { status: 400 },
            )
        }

        const data = await resend.emails.send({
            from: "My Website <website@resend.dev>",
            to: ["satyay3556@gmail.com"],
            replyTo: email,
            subject: subject,
            react: EmailTemplate({ email, name, message })
        })

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('[SEND_POST]', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}