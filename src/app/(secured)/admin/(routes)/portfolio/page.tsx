import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { prismadb } from "@/lib/prismadb";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/modules/portfolio/ui/components/columns";
import { AddButton } from "@/modules/portfolio/ui/components/add-button";

export const options = [];

const PortfolioPage = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/sign-in");
    };

    const portfolios = await prismadb.portfolio.findMany({
        where: {
            userId: session.user.id!,
        },
        orderBy: {
            createdAt: "asc",
        },
        include: {
            tags: true
        }
    });


    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">
                    Portfolio
                </CardTitle>
                <CardDescription>
                    Manage your portfolio list section informations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={portfolios}
                    columns={columns}
                    options={options}
                    AddButton={<AddButton />}
                    page="portfolio"
                />
            </CardContent>
        </Card>
    );
}

export default PortfolioPage;