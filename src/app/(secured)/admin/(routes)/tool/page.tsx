import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

import { columns } from "@/modules/tool/ui/components/columns";
import { DataTable } from "@/components/data-table/data-table";
import { AddButton } from "@/modules/tool/ui/components/add-button";

const filterOptions = [
    {
        label: "Light",
        value: "LIGHT"
    },
    {
        label: "Dark",
        value: "DARK"
    }
];

const ToolPage = async () => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        redirect("/sign-in");
    };

    const tools = await prismadb.tool.findMany({
        where: {
            userId: session?.user?.id
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">Tool & Apps</CardTitle>
                <CardDescription>
                    Manage your tool and apps list section informations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={tools}
                    columns={columns}
                    options={filterOptions}
                    AddButton={<AddButton />}
                    page="tool"
                />
            </CardContent>
        </Card>
    );
}

export default ToolPage;