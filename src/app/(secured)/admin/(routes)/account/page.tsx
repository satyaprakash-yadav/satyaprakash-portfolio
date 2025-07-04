import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { AccountForm } from "@/modules/account/ui/components/account-form";

const AccountPage = async () => {
    // const session = await auth();
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/sign-in");
    };

    const loggedInUser = await prismadb.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            name: true,
            email: true,
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
                <AccountForm user={loggedInUser} />
            </CardContent>
        </Card>
    );
}

export default AccountPage;