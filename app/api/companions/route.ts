import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, seed, categoryId, instructions } = body;

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

    const companion = await prisma.companion.create({
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
    console.log("COMPANIONS POST ROUTE ERROR: ", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
