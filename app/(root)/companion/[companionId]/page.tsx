import CompanionForm from "@/components/CompanionForm";
import prisma from "@/lib/prisma";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  // TODO: Check users subscription status

  const { userId } = auth();

  if(!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    },
  });

  const categories = await prisma.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
