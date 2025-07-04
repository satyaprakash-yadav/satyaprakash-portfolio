import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";
import { PortfolioForm } from "@/modules/portfolio/ui/components/portfolio-form";

import { BackButton } from "@/components/back-button";
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
    // const session = await auth();
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/sign-in");
    };

    const portfolio = await prismadb.portfolio.findUnique({
        where: {
            id: params.portfolioId,
            userId: user.id
        },
        include: {
            tags: true,
        },
    });


    return (
        <>
            <BackButton slug="/admin/portfolio" />
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
        </>
    );
}

export default PortfolioIdPage;