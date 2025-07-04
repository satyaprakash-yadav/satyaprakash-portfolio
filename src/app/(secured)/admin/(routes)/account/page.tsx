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
import { PasswordForm } from "@/modules/account/ui/components/password/password-form";
import { ProfileForm } from "@/modules/account/ui/components/profile/profile-form";

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
            id: true,
            name: true,
            email: true,
        }
    });

    return (
        <div className="grid lg:grid-cols-2 gap-4">
            <Card className="rounded-lg border-none">
                <CardHeader className="mx-[1px] pb-9">
                    <CardTitle className="text-xl font-semibold">
                        Profile
                    </CardTitle>
                    <CardDescription>
                        Manage your account profile informations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm user={loggedInUser} />
                </CardContent>
            </Card>
            <Card className="rounded-lg border-none">
                <CardHeader className="mx-[1px] pb-9">
                    <CardTitle className="text-xl font-semibold">Password</CardTitle>
                    <CardDescription>Manage your account password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default AccountPage;