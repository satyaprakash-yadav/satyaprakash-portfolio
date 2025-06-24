"use client";

import Link from "next/link";
import { LayoutTemplate, MenuIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "@/modules/dashboard/ui/components/menu";

export const SheetMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetTitle className="hidden"></SheetTitle>
            <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left" aria-describedby="">
                <SheetHeader>
                    <Button
                        className="flex justify-center items-center pb-2 pt-1"
                        variant="link"
                        asChild
                    >
                        <Link href="/admin" className="flex items-center gap-2">
                            <LayoutTemplate />
                            <h1 className="font-bold text-lg">Portfolio</h1>
                        </Link>
                    </Button>
                </SheetHeader>
                <Menu isOpen />
            </SheetContent>
        </Sheet>
    )
}