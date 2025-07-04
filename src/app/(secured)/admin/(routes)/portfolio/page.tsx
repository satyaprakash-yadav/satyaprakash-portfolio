// import { auth } from "@/lib/auth";
import { currentUser } from "@/lib/authentication";
import { redirect } from "next/navigation";

import { prismadb } from "@/lib/prismadb";

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/modules/portfolio/ui/components/portfolio-table/columns";
import { AddButton } from "@/modules/portfolio/ui/components/portfolio-table/add-button";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

import { ComponentType } from "react";

const filterOptions: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string | undefined }> | undefined;
}[] = [];

const PortfolioPage = async () => {
    // const session = await auth();
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/sign-in");
    };

    const portfolios = await prismadb.portfolio.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
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
                    options={filterOptions}
                    AddButton={<AddButton />}
                    page="portfolio"
                />
            </CardContent>
        </Card>
    );
}

export default PortfolioPage;