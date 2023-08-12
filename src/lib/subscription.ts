import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await prisma.userSubscription.findUnique({
    where: { userId },
    select: {
      stripePriceId: true,
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!userSubscription) return false;

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
