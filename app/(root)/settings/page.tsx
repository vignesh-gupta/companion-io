import SubscriptionBtn from "@/components/SubscriptionBtn";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-2">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm">
        {isPro ? "You are on a Pro Plan" : "You are on a a Free Plan"}
      </div>
      <SubscriptionBtn isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
