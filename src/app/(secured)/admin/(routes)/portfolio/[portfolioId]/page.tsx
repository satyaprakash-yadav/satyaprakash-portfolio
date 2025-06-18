import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { PortfolioForm } from "@/modules/portfolio/ui/components/portfolio-form";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

const PortfolioIdPage = async ({
    params
}: {
    params: { portfolioId: string };
}) => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/sign-in");
    };

    const portfolio = await prismadb.portfolio.findUnique({
        where: {
            id: params.portfolioId,
        },
        include: {
            tags: true,
        },
    });


    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">Edit Portfolio</CardTitle>
                <CardDescription>
                    Edit project information on your portfolio section.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PortfolioForm portfolio={portfolio} />
            </CardContent>
        </Card>
    );
}

export default PortfolioIdPage;