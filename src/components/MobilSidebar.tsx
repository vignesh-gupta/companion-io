import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";


const MobilSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className="p-0 pt-10 bg-secondary w-fit">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobilSidebar;
