/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { items } = body;

        // const session = await auth();
        const user = await currentUser();

        if (items.length < 1) {
            return NextResponse.json(
                { success: false, error: "Skill is required" },
                { status: 400 }
            );
        };

        items.map((item: { skill: string; level: string; type: string }) => {
            if (!item.skill) {
                return NextResponse.json(
                    { success: false, error: "Skill is required." },
                    { status: 400 }
                );
            };

            if (!item.level) {
                return NextResponse.json(
                    { success: false, error: "Level is required." },
                    { status: 400 }
                );
            };

            if (!item.type) {
                return NextResponse.json(
                    { success: false, error: "Type is required." },
                    { status: 400 }
                );
            };
        });

        if (!user || !user.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized." },
                { status: 400 }
            );
        };

        await prismadb.experience.deleteMany({
            where: {
                userId: user.id,
                type: items[0].type
            }
        });

        const experiences = await prismadb.experience.createMany({
            data: items.map(
                (item: { skill: string; level: string; type: string }) => ({
                    skill: item.skill,
                    level: item.level,
                    type: item.type,
                    userId: user.id,
                })
            )
        });

        revalidatePath("/");

        return NextResponse.json({ success: true, experiences })
    } catch (error: any) {
        console.log("[EXPERIENCE_POST]", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}