import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
import { currentUser } from "@/lib/authentication";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { prismadb } from "@/lib/prismadb";
import { ExpertiseForm } from "@/modules/expertise/ui/components/expertise-form";

const ExpertisePage = async () => {
  // const session = await auth();
  const user = await currentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const seoOptimazationItems = await prismadb.expertise.findMany({
    where: {
      userId: user.id,
      type: "SEOOPTIMIZATION",
    },
  });

  const webDevelopmentItems = await prismadb.expertise.findMany({
    where: {
      userId: user.id,
      type: "WEBDEVELOPMENT",
    },
  });

  const contentCreationItems = await prismadb.expertise.findMany({
    where: {
      userId: user.id,
      type: "CONTENTCREATION",
    },
  });

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-semibold">SEO Optimization</CardTitle>
          <CardDescription>
            Manage your SEO optimization section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpertiseForm
            expertiseType="SEOOPTIMIZATION"
            expertiseItems={seoOptimazationItems}
          />
        </CardContent>
      </Card>
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-semibold">Web Development</CardTitle>
          <CardDescription>
            Manage your Web development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpertiseForm
            expertiseType="WEBDEVELOPMENT"
            expertiseItems={webDevelopmentItems}
          />
        </CardContent>
      </Card>
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-semibold">Content Creation</CardTitle>
          <CardDescription>
            Manage your Content creation section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpertiseForm
            expertiseType="CONTENTCREATION"
            expertiseItems={contentCreationItems}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertisePage;
