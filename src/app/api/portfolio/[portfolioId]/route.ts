/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prismadb";
import getBlurDataUrl from "@/lib/image-blur";
import { currentUser } from "@/lib/authentication";

interface Props {
  params: Promise<{
    portfolioId: string;
  }>
};

export async function PATCH(
  req: Request,
  { params }: Props,
) {
  try {
    const { portfolioId } = await params;
    const user = await currentUser();
    const body = await req.json();
    const { image, thumbnail, title, description, githubUrl, demoUrl, tags } =
      body;

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 500 }
      );
    }

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

    if (!portfolioId) {
      return NextResponse.json(
        { success: false, error: "Portfolio ID is required." },
        { status: 400 }
      );
    }

    const portfolioFound = await prismadb.portfolio.findUnique({
      where: {
        id: portfolioId,
      },
    });

    if (!portfolioFound) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found." },
        { status: 400 }
      );
    }

    const blurDataUrl = await getBlurDataUrl(image);

    const portfolio = await prismadb.portfolio.update({
      where: {
        id: portfolioId,
      },
      data: {
        image,
        thumbnail,
        blurDataUrl,
        title,
        description,
        githubUrl,
        demoUrl,
      },
    });

    await prismadb.tag.deleteMany({
      where: {
        portfolioId: portfolioId,
      },
    });

    const tagsCreated = await prismadb.tag.createMany({
      data: tags.map((tag: { name: string; portfolioId: string }) => ({
        name: tag.name,
        portfolioId: portfolioId,
      })),
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, portfolio, tagsCreated });
  } catch (error: any) {
    console.log("[PORTFOLIO_PATCH]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: Props,
) {
  try {
    const { portfolioId } = await params;
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 500 }
      );
    }

    if (!portfolioId) {
      return NextResponse.json(
        { success: false, error: "Portfolio ID is required." },
        { status: 400 }
      );
    }

    const portfolioFound = await prismadb.portfolio.findUnique({
      where: {
        id: portfolioId,
      },
    });

    if (!portfolioFound) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found." },
        { status: 400 }
      );
    }

    const portfolio = await prismadb.portfolio.delete({
      where: {
        id: portfolioId
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, portfolio });
  } catch (error: any) {
    console.log("[PORTFOLIO_DELETE]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
