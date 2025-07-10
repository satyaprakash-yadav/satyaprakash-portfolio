"use client";

import { Resume } from "@prisma/client";
import { useState, useEffect } from "react";

import { Modal } from "@/components/modal";
import { UploadPdfForm } from "../upload-pdf-form";

interface UploadPdfModalProps {
    isOpen: boolean;
    onClose: () => void;
    resume: Resume | null;
};

export const UploadPdfModal = ({
    isOpen,
    resume,
    onClose,
}: UploadPdfModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    };

    return (
        <Modal
            title="Upload PDF"
            description="Update and upload your latest resume in PDF format."
            isOpen={isOpen}
            onClose={onClose}
        >
            <UploadPdfForm onClose={onClose} resume={resume} />
        </Modal>
    )
}