"use client";

import { routes } from "@/constants/mappingContants";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const onNavigate = (url: string, pro: boolean) => {
    // Check if the user has pro subscription
    return router.push(url);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-primary bg-secondary md:border-r-2 border-primary/10">
      <div className="flex justify-center flex-1 p-3">
        <div className="space-y-2">
          {routes.map((route, index) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-muted-foreground p-3 w-full text-xs group flex font-medium rounded-lg justify-start cursor-pointer hover:text-primary hover:bg-primary/10 transition",
                pathName === route.href && "text-primary bg-primary/10"
              )}
            >
              <div className="flex flex-col items-center flex-1 gap-y-2">
                <route.icon className="w-5 h-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
