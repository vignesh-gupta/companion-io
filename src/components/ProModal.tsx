"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useProModal } from "@/hooks/useProModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Separator } from "@ui/separator";
import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";

const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if(!isMounted) return null

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const res= await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong!"
      })
    }finally{
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create
            <span className="text-sky-500 mx-1 font-medium">Custom AI</span>
            Companion!
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex justify-between">
          <p>
            $99
            <span className="text-sm font-normal">.99 / month</span>
          </p>

          <Button variant="premium" onClick={onSubscribe} disabled={loading}>Subscribe</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
