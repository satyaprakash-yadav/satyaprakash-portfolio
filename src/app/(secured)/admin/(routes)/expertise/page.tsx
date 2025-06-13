import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const ExpertisePage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-bold">SEO Optimization</CardTitle>
          <CardDescription>
            Manage your SEO optimization section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>SeoOptimazationForm</CardContent>
      </Card>
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-bold">Web Development</CardTitle>
          <CardDescription>
            Manage your Web development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>WebDevelopmentForm</CardContent>
      </Card>
      <Card className="rounded-lg border-none">
        <CardHeader className="mx-[1px] pb-9">
          <CardTitle className="text-xl font-bold">Content Creation</CardTitle>
          <CardDescription>
            Manage your Content creation section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>ContentCreationForm</CardContent>
      </Card>
    </div>
  );
};

export default ExpertisePage;
