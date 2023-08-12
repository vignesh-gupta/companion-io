"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

const SubscriptionBtn = ({ isPro = false }: { isPro: boolean }) => {

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async() => {
    try {
      setLoading(true);

      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      })
    }finally{
      setLoading(false);
    }
  }

  return (
    <Button onClick={onClick} disabled={loading} size="sm" variant={isPro ? "default" : "premium"}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionBtn;
