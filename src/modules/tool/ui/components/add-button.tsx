"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AddButton = () => {
    return (
        <Button
            size="sm"
            className="h-8"
            asChild
        >
            <Link href="/admin/tool/add">
                <PlusCircle size={16} className="mr-2" />
                Add
            </Link>
        </Button>
    )
}