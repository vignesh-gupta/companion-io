import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, seed, categoryId, instructions } = body;

    if (!params.companionId) {
      return new NextResponse("Missing companionId", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !seed ||
      !categoryId ||
      !instructions
    ) {
      return new NextResponse("Missing Required fields", { status: 400 });
    }

    // TODO: Check for subscription

    const companion = await prisma.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        seed,
        description,
        name,
        instructions,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANIONS_PATCH_ROUTE_ERROR]: ", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.companionId) {
      return new NextResponse("Missing companionId", { status: 400 });
    }

    const companion = await prisma.companion.delete({
      where: {
        userId,
        id: params.companionId,
      }
    })

    return NextResponse.json(companion);

  } catch (error) {
    console.log("[COMPANIONS_DELETE_ROUTE_ERROR]: ", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
