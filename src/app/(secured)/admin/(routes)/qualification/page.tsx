import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { columns } from "@/modules/qualifications/ui/components/qualification-table/columns";
import { AddButton } from "@/modules/qualifications/ui/components/qualification-table/add-button";
import { DataTable } from "@/components/data-table/data-table";

const filterOptions = [
    {
        label: "Education",
        value: "EDUCATION",
    },
    {
        label: "Experience",
        value: "EXPERIENCE"
    }
]

const QualificationPage = async () => {
    // const session = await auth();
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/sign-in");
    };

    const qualifications = await prismadb.qualification.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "asc",
        }
    });

    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">Qualification</CardTitle>
                <CardDescription>
                    Manage your qualification section information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={qualifications}
                    columns={columns}
                    options={filterOptions}
                    AddButton={<AddButton />}
                    page="qualification"
                />
            </CardContent>
        </Card>
    );
}

export default QualificationPage;