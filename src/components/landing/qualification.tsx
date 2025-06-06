"use client";

import { Briefcase, GraduationCap } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { QualificationCard } from "@/modules/home/ui/components/qualification-card";

const data_education = [
  {
    start_year: "2004",
    end_year: "2016",
    school: "Abhinav Bal Vidyalaya Mandir English Medium High School",
    degree: "(10th) Higher Secondary Certificate of Education",
  },
  {
    start_year: "2016",
    end_year: "2018",
    school: "B.N.N. College in Science (MH)",
    degree: "(12th) Higher Secondary Certificate of Education",
  },
  {
    start_year: "2018",
    end_year: "2021",
    school: "B.N.N. College in Science (MH)",
    degree: "Digree in Information Technology",
  },
];

const data_experience = [
  {
    start_year: "2022",
    end_year: "2023",
    company: "KnowledgeWorks Global Ltd",
    position: "Software Development",
  },
  {
    start_year: "2023",
    end_year: "2023",
    company: "Sahayata24x7 - K3Y Technology Services Private Limited",
    position: "Full Stack Developer",
  },
  {
    start_year: "2023",
    end_year: "2024",
    company: "Aryabhata2.O institiue",
    position: "Web Developer Teaching",
  },
  {
    start_year: "2025",
    end_year: "present",
    company: "Dr. Kana pvt ltd",
    position: "Web Developer - Freelancer",
  },
];

export const Qualification = () => {
  return (
    <section id="qualification" className="mt-32">
      <h1 className="text-center text-sm text-muted-foreground font-medium">
        My Personal Journey
      </h1>
      <h2 className="text-center text-2xl font-medium pt-1">Qualification</h2>
      <div className="w-full max-w-[810px] mx-auto pt-8">
        <Tabs defaultValue="education" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="education">
            <QualificationCard
              icon={GraduationCap}
              qualificationType="education"
              data={data_education}
            />
          </TabsContent>
          <TabsContent value="experience">
            <QualificationCard
              icon={Briefcase}
              qualificationType="experience"
              data={data_experience}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
