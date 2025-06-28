import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

const AccountLoading = () => {
    return (
        <Card className="rounded-lg border-none">
            <CardHeader className="mx-[1px] pb-9">
                <CardTitle className="text-xl font-semibold">
                    <Skeleton className="h-7 w-[100px]" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-5 w-[300px]" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-9 w-24 mt-2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default AccountLoading;