"use client";

import { Table } from "@tanstack/react-table";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
};

export function DataTableViewOptions<TData>({
    table
}: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 flex"
                >
                    <MixerHorizontalIcon className="mr-2 size-4" />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        let columnName = column.id;
                        if (column.id === "createdAt") {
                            columnName = "Created";
                        } else if (column.id === "startYear") {
                            columnName = "Start";
                        } else if (column.id === "endYear") {
                            columnName = "End";
                        } else if (column.id === "demoUrl") {
                            columnName = "Demo";
                        } else if (column.id === "githubUrl") {
                            columnName = "GitHub";
                        }

                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize hover:cursor-pointer"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {columnName}
                            </DropdownMenuCheckboxItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}