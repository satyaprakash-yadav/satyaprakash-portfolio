"use client";
import { AspectRatio } from "@/components/aspect-ratio";

interface ViewResumeProps {
    url: string | null;
};

export const ViewResume = ({ url }: ViewResumeProps) => {
    return (
        <>
            {!url && (
                <div className="w-full h-[500px] flex justify-center items-center p-9 border rounded-md">
                    <p className="text-center font-medium">No resume found.</p>
                </div>
            )}
            {url && (
                <>
                    <AspectRatio ratio={210 / 297}>
                        <object
                            data={url}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            className="w-full h-full rounded-md"
                        >
                            <iframe
                                src={url}
                                width="100%"
                                height="100%"
                                className="w-full h-full"
                            >
                                Your browser does not support PDF.
                            </iframe>
                        </object>
                    </AspectRatio>
                </>
            )}
        </>
    )
};
