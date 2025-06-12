import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SidebarToogleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export const SidebarToggle = ({ isOpen, setIsOpen }: SidebarToogleProps) => {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20 bg-white dark:bg-primary-foreground">
      <Button
        onClick={() => setIsOpen?.()}
        className=""
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "size-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
};
