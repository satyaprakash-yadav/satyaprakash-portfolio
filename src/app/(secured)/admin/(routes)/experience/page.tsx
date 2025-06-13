import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";

import { FrontendForm } from "@/modules/experience/ui/components/frontend-form";

const ExperiencePage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const frontendItems = await prismadb.experience.findMany({
    where: {
      userId: session.user.id!,
      type: "frontend",
    },
  });

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-bold">
            Frontend Development
          </CardTitle>
          <CardDescription>
            Manage your frontend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FrontendForm frontendItems={frontendItems} />
        </CardContent>
      </Card>
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-bold">
            Backend Development
          </CardTitle>
          <CardDescription>
            Manage your backend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>BackendDevelopment</CardContent>
      </Card>
    </div>
  );
};

export default ExperiencePage;
