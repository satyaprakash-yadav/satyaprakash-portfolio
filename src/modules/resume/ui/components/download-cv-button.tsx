"use client";

import { useState } from "react";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { DownloadCvForm } from "./download-cv-form";

export const DownloadCvButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Download CV
            </Button>
            <Modal
                title="Download CV"
                description="Fill in the form below and download link will be sent to your email."
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <DownloadCvForm onClose={() => setOpen(false)} />
            </Modal>
        </>
    )
}