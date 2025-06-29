import { BackButton } from "@/components/back-button";
import { ToolForm } from "@/modules/tool/ui/components/tool-form";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

const AddPage = () => {
    return (
        <>
            <BackButton slug="/admin/tool" />
            <Card className="rounded-lg border-none">
                <CardHeader className="mx-[1px] pb-9">
                    <CardTitle className="text-xl font-semibold">Add Tool</CardTitle>
                    <CardDescription>
                        Add more tool or app on your tool and apps section.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ToolForm />
                </CardContent>
            </Card>
        </>
    );
}

export default AddPage;