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


const MobilSidebar = ({ isPro }: { isPro: boolean }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="block md:hidden" />
        </SheetTrigger>
        <SheetContent side='left' className="p-0 pt-10 bg-secondary w-fit">
          <Sidebar isPro={isPro} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobilSidebar;
