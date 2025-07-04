"use client";

import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
};

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className, "text-xs")}>{title}</div>
    };

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label={
                            column.getIsSorted() === "desc"
                                ? "Sorted descending. Click to sort ascending."
                                : column.getIsSorted() === "asc"
                                    ? "Sorted ascending. Click to sort descending."
                                    : "Not sorted. Click to sort ascending."
                        }
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 size-4" aria-hidden="true" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 size-4" aria-hidden="true" />
                        ) : (
                            <CaretSortIcon className="ml-2 size-4" aria-hidden="true" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        aria-label="Sort ascending"
                        onClick={() => column.toggleSorting(false)}
                    >
                        <ArrowUpIcon
                            className="mr-2 size-3.5 text-muted-foreground/70"
                        />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        aria-label="Sort descending"
                        onClick={() => column.toggleSorting(true)}
                    >
                        <ArrowDownIcon
                            className="mr-2 size-3.5 text-muted-foreground/70"
                        />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        aria-label="Hide column"
                        onClick={() => column.toggleVisibility(false)}
                    >
                        <EyeNoneIcon
                            className="mr-2 size-3.5 text-muted-foreground/70"
                        />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}