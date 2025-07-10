"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Resume } from "@prisma/client";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
// import { UploadPdfModal } from "./modals/upload-pdf-modal";
import { UploadPdfForm } from "./upload-pdf-form";

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
                Upload <span className="hidden sm:inline ml-1">PDF</span>
            </Button>
            <Modal
                title="Upload PDF"
                description="Update and upload your latest resume in PDF format."
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <UploadPdfForm
                    onClose={() => setOpen(false)}
                    resume={resume}
                />
            </Modal>
        </>
    )
}