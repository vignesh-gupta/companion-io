import prisma from "@/lib/prisma";
import { checkSubscription } from "@/lib/subscription";
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

    // Checking for subscription
    const isPro = await checkSubscription();

    if(!isPro) {
      return new NextResponse("Pro Subscription required", { status: 403 });
    }

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
