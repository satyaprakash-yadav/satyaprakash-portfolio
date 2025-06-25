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
            <Link href="/admin/portfolio/create">
                <PlusCircle className="mr-2" size={16} />
                Create
            </Link>
        </Button>
    )
}