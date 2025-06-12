import { AboutForm } from "@/modules/about/ui/components/about-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutPage = () => {
  return (
    <Card className="rounded-lg border-none">
      <CardHeader className="mx-[1px] pb-9">
        <CardTitle className="text-xl font-bold">About</CardTitle>
        <CardDescription>
          Manage your about section informations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AboutForm />
      </CardContent>
    </Card>
  );
};

export default AboutPage;
