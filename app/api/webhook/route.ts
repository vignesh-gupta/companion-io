import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  checkoutSessionCompleted,
  invoicePaymentSucceeded,
} from "./_utils";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      await checkoutSessionCompleted(session);
      break;
    case "invoice.payment_succeeded":
      await invoicePaymentSucceeded(session);
      break;
  }
  return new NextResponse(null, { status: 200 });
}
