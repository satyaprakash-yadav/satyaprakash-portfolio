import axios from "axios";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useEdgeStore } from "@/lib/edgestore";

import { Button } from "../ui/button";

import { AlertModal } from "../modals/alert-modal";
import { portfolioSchema } from "@/modules/portfolio/schemas";

interface DataTableDeleteProps<TData> {
    table: Table<TData>;
    page: string;
};

export default function DataTableDelete<TData>({
    table,
    page
}: DataTableDeleteProps<TData>) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { edgestore } = useEdgeStore();

    const onDelete = async () => {
        try {
            setLoading(true);

            if (page === "portfolio") {
                await Promise.all(
                    table.getFilteredSelectedRowModel().flatRows.map(async (row) => {
                        const portfolio = portfolioSchema.parse(row.original);
                        return await edgestore.publicImages.delete({
                            url: portfolio.image,
                        })
                    })
                )
            };

            await axios.post(
                `/api/${page}/delete-multiple`,
                table.getFilteredSelectedRowModel().flatRows.map((row) => row.original)
            );

            router.refresh();

            toast.success("Data successfully deleted.")
        } catch (error) {
            console.log(error);
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
            <Button
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
            >
                <Trash className="mr-2" size={16} />
                Delete
            </Button>
        </>
    )
}