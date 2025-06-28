import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

import { DataTableLoading } from "@/components/data-table/data-table-loading";

const PortfolioLoading = () => {
    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] mb-9">
                <CardTitle className="text-xl font-semibold">
                    <Skeleton className="h-7 w-[100px]" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-5 w-[300px]" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTableLoading tableType="portfolio" columnCount={8} rowCount={10} />
            </CardContent>
        </Card>
    );
}

export default PortfolioLoading;