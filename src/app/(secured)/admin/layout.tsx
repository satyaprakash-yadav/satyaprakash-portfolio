import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import ModalProvider from "@/providers/modal-provider";

interface Props {
    children: React.ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/sign-in");
    };
    
    return ( 
        <>  
            <ModalProvider />
            {children}
        </>
    );
}
 
export default AdminLayout;