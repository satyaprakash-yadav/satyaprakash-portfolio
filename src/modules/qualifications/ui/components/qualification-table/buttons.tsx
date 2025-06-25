"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQualificationModal } from "@/hooks/use-qualification-modal";

export const AddButton = () => {
    const qualificationModal = useQualificationModal();

    return (
        <Button
            size="sm"
            className="h-8"
            onClick={() => {
                qualificationModal.setTitle("Create Qualification");
                qualificationModal.setDescription(
                    "Add more information on your qualification section."
                )
                qualificationModal.setQualification(undefined);
                qualificationModal.onOpen();
            }}
        >
            <PlusCircle className="mr-2" size={16} />
            Create
        </Button>
    )
}