import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { MiscellaneousForm } from "@/modules/miscellaneous/ui/components/miscellaneous-form";

const MiscellaneousPage = async () => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        redirect("/sign-in");
    };

    const miscellaneous = await prismadb.miscellaneous.findFirst({
        where: {
            userId: session?.user?.id,
        },
        include: {
            titles: true,
        }
    });

    return ( 
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">Miscellaneous</CardTitle>
                <CardDescription>
                    Manage your miscellaneous informations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <MiscellaneousForm miscellaneous={miscellaneous} />
            </CardContent>
        </Card>
    );
}
 
export default MiscellaneousPage;