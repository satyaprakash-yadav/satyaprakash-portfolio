import Link from "next/link";
import { PanelTop } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";

interface ViewWebsiteProps {
    newTab?: boolean;
};

export const ViewWebsite = ({ newTab }: ViewWebsiteProps) => {
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
                        <Link
                            href="/"
                            target={`${!newTab ? "_blank" : "_self"}`}
                            rel="noopener noreferer"
                        >
                            <PanelTop className="size-5" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">View Website</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}