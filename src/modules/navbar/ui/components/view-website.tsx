import Link from "next/link";
import { PanelTop } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";

export const ViewWebsite = () => {
    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8 rounded-full bg-background"
                        asChild
                    >
                        <Link href="/">
                            <PanelTop className="size-5" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">View Website</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}