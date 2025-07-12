import { prismadb } from "@/lib/prismadb";
import { Footer } from "@/components/landing/footer";

interface Props {
    children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
    const miscellaneous = await prismadb.miscellaneous.findFirst();

    return (
        <>
            {children}
            <Footer miscellaneous={miscellaneous} />
        </>
    );
}

export default MainLayout;