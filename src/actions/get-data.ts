import { prismadb } from "@/lib/prismadb";
import type { About, Experience } from "@prisma/client";

interface DataProps {
    about: About | null;
    frontend: Experience[];
    backend: Experience[];
};

const getData = async (): Promise<DataProps> => {
    const [about, frontend, backend] = await prismadb.$transaction([
        prismadb.about.findFirst(),
        prismadb.experience.findMany({
            where: {
                type: "frontend",
            }
        }),
        prismadb.experience.findMany({
            where: {
                type: "backend",
            }
        })
    ]);

    return { about, frontend, backend };
}

export default getData;