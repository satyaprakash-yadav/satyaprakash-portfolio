import { redirect } from "next/navigation";

import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@/lib/authentication";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { ViewResume } from "@/modules/resume/ui/components/view-resume";
import { UploadPdfButton } from "@/modules/resume/ui/components/upload-pdf-button";

const ResumePage = async () => {
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/sign-in");
    };

    const resume = await prismadb.resume.findFirst({
        where: {
            userId: user.id,
        }
    });

    return ( 
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-bold items-center flex justify-between">
                    Resume
                    <UploadPdfButton resume={resume} />
                </CardTitle>
                <CardDescription>
                    Manage your resume pdf file.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ViewResume url={resume?.pdf ?? null} />
            </CardContent>
        </Card>
     );
}
 
export default ResumePage;