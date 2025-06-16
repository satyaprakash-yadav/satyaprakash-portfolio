"use client";

import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Edit, Trash2, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { AlertModal } from "@/components/modals/alert-modal";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { qualificationSchema } from "../../schemas";
import { toast } from "sonner";

interface CellActionsProps<TData> {
    row: Row<TData>;
};

export function CellActions<TData>({ row }: CellActionsProps<TData>) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const qualification = qualificationSchema.parse(row.original);

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/qualification/${qualification.id}`);

            router.refresh();
            toast.success("Data successfully deleted.")
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
            setOpen(false);
        };
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 data-[state=open]:bg-muted"
                    >
                        <Ellipsis className="size-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <Edit className="mr-2" size={14} />
                        Edit
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