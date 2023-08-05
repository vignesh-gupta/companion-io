"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ weight: ["600"], subsets: ["latin"] });
const Navbar = () => {
  return (
    <div className="fixed z-50 flex items-center justify-between w-full px-4 py-2 border-b border-b-primary/10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />

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
        <Button size="sm" variant="premium">
          Upgrade <Sparkles className="w-4 h-4 ml-2 text-white fill-white" />
        </Button>
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
