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

const AccountPage = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/sign-in");
    };

    const user = await prismadb.user.findUnique({
        where: {
            id: session.user.id!,
        }
    });

    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">
                    Account
                </CardTitle>
                <CardDescription>
                    Manage your account profile informations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                Profile Form!
            </CardContent>
        </Card>
    );
}

export default AccountPage;