"use client";

import { useState, useEffect } from "react";

import QualificationModal from "@/components/modals/qualification-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    };

    return ( 
        <>
            <QualificationModal />
        </>
     );
}
 
export default ModalProvider;