import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function checkoutSessionCompleted(session : Stripe.Checkout.Session ){
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  if (!session?.metadata?.userId) {
    console.error("UserId is missing");

    return new NextResponse("UserId is missing", { status: 400 });
  }

  await prisma.userSubscription.create({
    data: {
      userId: session?.metadata?.userId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
    },
  });
}

export async function invoicePaymentSucceeded(session : Stripe.Checkout.Session){
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  await prisma.userSubscription.update({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    data: {
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
    },
  });
}