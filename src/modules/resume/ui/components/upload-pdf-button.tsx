"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Resume } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { UploadPdfModal } from "./modals/upload-pdf-modal";

interface UploadPdfButtonProps {
    resume: Resume | null;
};

export const UploadPdfButton = ({ resume }: UploadPdfButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                size="sm"
                onClick={() => setOpen(true)}
            >
                <Upload className="mr-2 size-4" />
                Upload PDF
            </Button>
            <UploadPdfModal
                isOpen={open}
                onClose={() => setOpen(false)}
                resume={resume}
            />
        </>
    )
}