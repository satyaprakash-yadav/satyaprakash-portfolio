/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prismadb";

import getBlurDataUrl from "@/lib/image-blur";
import { currentUser } from "@/lib/authentication";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, thumbnail, title, description, githubUrl, demoUrl, tags } =
      body;

    const user = await currentUser();

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image is required." },
        { status: 400 }
      );
    }

    if (!thumbnail) {
      return NextResponse.json(
        { success: false, error: "Thumbnail is required." },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required." },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { success: false, error: "Description is required." },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, error: "GitHub URL is required." },
        { status: 400 }
      );
    }

    if (!demoUrl) {
      return NextResponse.json(
        { success: false, error: "Demo URL is required." },
        { status: 400 }
      );
    }

    if (tags.length < 1) {
      return NextResponse.json(
        { success: false, error: "Tags is required." },
        { status: 400 }
      );
    }

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const blurDataUrl = await getBlurDataUrl(image);

    const portfolio = await prismadb.portfolio.create({
      data: {
        image,
        thumbnail,
        blurDataUrl,
        title,
        description,
        githubUrl,
        demoUrl,
        userId: user.id,
      },
    });

    const tagsCreated = await prismadb.tag.createMany({
      data: tags.map((tag: { name: string; portfolioId: string }) => ({
        name: tag.name,
        portfolioId: portfolio.id,
      })),
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, portfolio, tagsCreated });
  } catch (error: any) {
    console.log("[PORTFOLIO_POST]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const offset = searchParams.get("offset");

    const portfolios = await prismadb.portfolio.findMany({
      skip: typeof offset === "string" ? parseInt(offset) : 0,
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    });

    // const photosWithBlur = await addBlurredDataUrls(portfolios);

    // return NextResponse.json({ success: true, photosWithBlur });
    return NextResponse.json({ success: true, portfolios });
  } catch (error: any) {
    console.log("[PORTFOLIO_GET]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
