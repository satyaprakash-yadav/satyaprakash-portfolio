import ModalProvider from "@/providers/modal-provider";

interface Props {
    children: React.ReactNode;
}

const AdminLayout = async ({ children }: Props) => {

    return (
        <>
            <ModalProvider />
            {children}
        </>
    );
}

export default AdminLayout;