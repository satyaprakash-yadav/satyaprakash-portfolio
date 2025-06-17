"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { AlertModal } from "@/components/modals/alert-modal";

import { portfolioSchema } from "../../schemas";

interface CellActionsProps<TData> {
    row: Row<TData>;
};

export function CellActions<TData>({ row }: CellActionsProps<TData>) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const portfolio = portfolioSchema.parse(row.original);

    const onDelete = async () => { }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href={`/admin/portfolio/${portfolio.id}`}>
                            <Edit className="mr-2" size={14} />
                            Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="group hover:cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Trash2 className="mr-2 group-hover:text-destructive" size={14} />
                        <span className="group-hover:text-destructive">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}