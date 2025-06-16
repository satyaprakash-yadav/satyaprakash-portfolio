"use client";

import { Modal } from "@/components/modal";
import { useQualificationModal } from "@/hooks/use-qualification-modal";

const QualificationModal = () => {
    const qualificationModal = useQualificationModal();

    return (
        <Modal
            title={qualificationModal.title}
            description={qualificationModal.description}
            isOpen={qualificationModal.isOpen}
            onClose={qualificationModal.onClose}
        >
            test
        </Modal>
    );
}

export default QualificationModal;