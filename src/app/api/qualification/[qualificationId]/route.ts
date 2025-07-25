/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

interface Props {
  params: Promise<{
    qualificationId: string;
  }>
};

export async function PATCH(
  req: Request,
  { params }: Props,
) {
  try {
    const { qualificationId } = await params;
    const user = await currentUser();
    const body = await req.json();
    const { type, degree, school, position, company, startYear, endYear } =
      body;

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { success: false, error: "Type is required." },
        { status: 400 }
      );
    }

    if (type === "EDUCATION" && !degree) {
      return NextResponse.json(
        { success: false, error: "Degree is required." },
        { status: 400 }
      );
    }

    if (type === "EDUCATION" && !school) {
      return NextResponse.json(
        { success: false, error: "School is required." },
        { status: 400 }
      );
    }

    if (type === "EXPERIENCE" && !position) {
      return NextResponse.json(
        { success: false, error: "Position is required." },
        { status: 400 }
      );
    }

    if (type === "EXPERIENCE" && !company) {
      return NextResponse.json(
        { success: false, error: "Company is required." },
        { status: 400 }
      );
    }

    if (!startYear) {
      return NextResponse.json(
        { success: false, error: "Start year is required." },
        { status: 400 }
      );
    }

    if (!endYear) {
      return NextResponse.json(
        { success: false, error: "End year is required." },
        { status: 400 }
      );
    }

    if (!qualificationId) {
      return NextResponse.json(
        { success: false, error: "Qualification ID is required." },
        { status: 400 }
      );
    }

    const qualificationFound = await prismadb.qualification.findUnique({
      where: {
        id: qualificationId,
      },
    });

    if (!qualificationFound) {
      return NextResponse.json(
        { success: false, error: "Qualification not found." },
        { status: 400 }
      );
    }

    const qualification = await prismadb.qualification.update({
      where: {
        id: qualificationId,
      },
      data: {
        type,
        degree,
        school,
        position,
        company,
        startYear,
        endYear,
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, qualification });
  } catch (error: any) {
    console.log("[QUALIFICATION_PATCH]", error);
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
    const { qualificationId } = await params;
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!qualificationId) {
      return NextResponse.json(
        { success: false, error: "Qualification ID is required." },
        { status: 400 }
      );
    }

    const qualificationFound = await prismadb.qualification.findUnique({
      where: {
        id: qualificationId,
      },
    });

    if (!qualificationFound) {
      return NextResponse.json(
        { success: false, error: "Qualification not found." },
        { status: 400 }
      );
    }

    const qualification = await prismadb.qualification.delete({
      where: {
        id: qualificationId,
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, qualification });
  } catch (error: any) {
    console.log("[QUALIFICATION_DELETE]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
