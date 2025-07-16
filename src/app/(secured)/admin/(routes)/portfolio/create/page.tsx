import { BackButton } from "@/components/back-button";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

import { PortfolioForm } from "@/modules/portfolio/ui/components/portfolio-form";

const CreatePage = () => {
    return (
        <>
            <BackButton slug="/admin/portfolio" />
            <Card className="rounded-lg border-none">
                <CardHeader className="mx-[1px] pb-9">
                    <CardTitle className="text-xl font-semibold">
                        Add Project
                    </CardTitle>
                    <CardDescription>
                        Add more project on your portfolio section.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PortfolioForm />
                </CardContent>
            </Card>
        </>
    );
}

export default CreatePage;