import { prismadb } from "@/lib/prismadb";
import type { About } from "@prisma/client";

interface DataProps {
    about: About | null;
};

const getData = async (): Promise<DataProps> => {
    const [about] = await prismadb.$transaction([prismadb.about.findFirst()]);

    return { about };
}

export default getData;