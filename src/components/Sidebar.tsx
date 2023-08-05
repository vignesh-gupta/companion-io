"use client";

import { Home } from "lucide-react";
import React from "react";

const Sidebar = () => {

  const routes = [
    {
      icon: Home,
    }
  ]

  return (
    <div className="flex flex-col h-full space-y-4 text-primary bg-secondary">
      <div className="justify-center flex-1 p-3">
        <div className="space-y-2">
          Routes
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
