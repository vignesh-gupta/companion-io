"use client";

import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import MobilSidebar from "./MobileSidebar";
import { useProModal } from "@/hooks/useProModal";

const poppins = Poppins({ weight: ["600"], subsets: ["latin"] });

const Navbar = ({ isPro }: { isPro: boolean }) => {
  const { onOpen } = useProModal();

  return (
    <header className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-b-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobilSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden text-xl font-bold md:block md:text-3xl text-primary",
              poppins.className
            )}
          >
            companion.io
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button size="sm" variant="premium" onClick={onOpen}>
            Upgrade <Sparkles className="w-4 h-4 ml-2 text-white fill-white" />
          </Button>
        )}
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

export default Navbar;
