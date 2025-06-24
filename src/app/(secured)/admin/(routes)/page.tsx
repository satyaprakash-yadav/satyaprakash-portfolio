import { redirect } from "next/navigation";
import { Book, Briefcase, FolderGit2, Laptop } from "lucide-react";

import { auth } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { QualificationTab } from "@/modules/dashboard/ui/components/qualification-tab";

const DashboardPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  };

  const [portfolioCount, education, experience] = await prismadb.$transaction([
    prismadb.portfolio.count(),
    prismadb.qualification.findMany({
      where: {
        type: "EDUCATION",
      },
      orderBy: {
        id: "desc",
      }
    }),
    prismadb.qualification.findMany({
      where: {
        type: "EXPERIENCE",
      },
      orderBy: {
        id: "desc",
      }
    })
  ]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio</CardTitle>
            <FolderGit2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioCount}</div>
            <p className="text-xs text-muted-foreground">completed projects</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Book className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5+</div>
            <p className="text-xs text-muted-foreground">years of working</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Job</CardTitle>
            <Briefcase className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold max-w-[206px] truncate">
              Web Developer
            </div>
            <p className="text-xs text-muted-foreground">Freelancer - Kanalogistics pvt ltd</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <Laptop className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold max-w-[206px] truncate">
              Worldwide
            </div>
            <p className="text-xs text-muted-foreground">remotely available</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid xl:grid-cols-5 gap-4 mt-4">
        <Card className="rounded-lg border-none col-span-3">
          <CardHeader className="relative mx-[1px]">
            <CardTitle className="text-xl font-bold">Qualification</CardTitle>
            <CardDescription>
              My personal journey on education & working experience
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-9">
            <QualificationTab education={education} experience={experience} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
