import { AboutForm } from "@/modules/about/ui/components/about-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { redirect } from "next/navigation";

const AboutPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const about = await prismadb.about.findFirst({
    where: {
      userId: session.user.id!,
    },
  });

  return (
    <Card className="rounded-lg border-none">
      <CardHeader className="mx-[1px] pb-9">
        <CardTitle className="text-xl font-bold">About</CardTitle>
        <CardDescription>
          Manage your about section informations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AboutForm about={about} />
      </CardContent>
    </Card>
  );
};

export default AboutPage;
