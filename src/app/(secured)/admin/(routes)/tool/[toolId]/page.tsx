import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

import { BackButton } from "@/components/back-button";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { ToolForm } from "@/modules/tool/ui/components/tool-form";

interface Props {
    params: Promise<{
        toolId: string;
    }>
};


const TooIdPage = async ({ params }: Props) => {
    const { toolId } = await params;
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/sign-in");
    };

    const tool = await prismadb.tool.findUnique({
        where: {
            id: toolId,
            userId: user.id,
        }
    });

    return (
        <>
            <BackButton slug="/admin/tool" />
            <Card className="rounded-lg border-none">
                <CardHeader className="mx-[1px] pb-9">
                    <CardTitle className="text-xl font-semibold">Edit Tool</CardTitle>
                    <CardDescription>
                        Edit tool or app information on your tool and apps section.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ToolForm tool={tool} />
                </CardContent>
            </Card>
        </>
    );
}

export default TooIdPage;