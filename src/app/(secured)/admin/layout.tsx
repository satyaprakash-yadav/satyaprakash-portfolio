import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/sign-in");
    };
    
    return ( 
        <main>{children}</main>
    );
}
 
export default AdminLayout;