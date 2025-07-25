"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LazyMotionLayout } from "../ui/lazy-motion";

import { QualificationCard } from "@/modules/home/ui/components/qualification-card";

import { slideInFromRight, slideInFromTop } from "@/lib/motion";

import type getData from "@/actions/get-data";

// const data_education = [
//   {
//     start_year: "2004",
//     end_year: "2016",
//     school: "Abhinav Bal Vidyalaya Mandir English Medium High School",
//     degree: "(10th) Higher Secondary Certificate of Education",
//   },
//   {
//     start_year: "2016",
//     end_year: "2018",
//     school: "B.N.N. College in Science (MH)",
//     degree: "(12th) Higher Secondary Certificate of Education",
//   },
//   {
//     start_year: "2018",
//     end_year: "2021",
//     school: "B.N.N. College in Science (MH)",
//     degree: "Digree in Information Technology",
//   },
// ];

// const data_experience = [
//   {
//     start_year: "2022",
//     end_year: "2023",
//     company: "KnowledgeWorks Global Ltd",
//     position: "Software Development",
//   },
//   {
//     start_year: "2023",
//     end_year: "2023",
//     company: "Sahayata24x7 - K3Y Technology Services Private Limited",
//     position: "Full Stack Developer",
//   },
//   {
//     start_year: "2023",
//     end_year: "2024",
//     company: "Aryabhata2.O institiue",
//     position: "Web Developer Teaching",
//   },
//   {
//     start_year: "2025",
//     end_year: "Present",
//     company: "Dr. Kana pvt ltd",
//     position: "Web Developer - Freelancer",
//   },
// ];

type QualificationProps = Pick<
  Awaited<ReturnType<typeof getData>>,
  "education" | "experience"
>;

export const Qualification = ({
  education,
  experience,
}: QualificationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotionLayout>
      <m.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        id="qualification" className="mt-32">
        <m.span
          variants={slideInFromTop(0.3)}
          className="block text-center text-sm text-muted-foreground font-medium"
        >
          My Personal Journey
        </m.span>
        <m.h2
          variants={slideInFromTop(0.4)}
          className="text-center text-2xl font-semibold pt-1"
        >
          Qualification
        </m.h2>
        <m.div
          variants={slideInFromRight(0.5)}
          className="w-full max-w-[810px] mx-auto pt-8"
        >
          <Tabs defaultValue="education" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>
            <TabsContent value="education">
              <QualificationCard
                icon={GraduationCap}
                qualificationType="education"
                data={education}
              />
            </TabsContent>
            <TabsContent value="experience">
              <QualificationCard
                icon={Briefcase}
                qualificationType="experience"
                data={experience}
              />
            </TabsContent>
          </Tabs>
        </m.div>
      </m.section>
    </LazyMotionLayout>
  );
};
