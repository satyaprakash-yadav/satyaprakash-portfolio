"use client";

import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { m, useInView } from "framer-motion";

import { LazyMotionLayout } from "@/components/ui/lazy-motion";

import type getData from "@/actions/get-data";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

type ExperienceProps = Pick<
  Awaited<ReturnType<typeof getData>>,
  "frontend" | "backend"
>;

export const Experience = ({
  frontend,
  backend,
}: ExperienceProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotionLayout>
      <m.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        id="experience"
        className="mt-32"
      >
        <m.span
          variants={slideInFromTop(0.3)}
          className="block text-center text-sm text-muted-foreground font-medium"
        >
          What Skills I have
        </m.span>
        <m.h2
          variants={slideInFromTop(0.4)}
          className="text-center text-2xl font-semibold pt-1"
        >
          Technical Level
        </m.h2>
        <div className="grid lg:grid-cols-2 gap-8 pt-8">
          <m.div
            variants={slideInFromLeft(0.5)}
            className="w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:py-9 md:px-20"
          >
            <h3 className="text-lg md:text-xl text-primary-foreground group-hover:text-primary pb-8">
              Frontend Development
            </h3>
            <div className="w-full grid grid-cols-2 gap-y-4">
              {frontend.map(({ skill, level }, index) => (
                <article
                  key={index}
                  className="flex gap-4 text-primary-foreground group-hover:text-primary"
                >
                  <BadgeCheck className="size-5 mt-[2px]" />
                  <div className="flex flex-col">
                    <h4 className="text-sm md:text-base">{skill}</h4>
                    <small className="text-xs md:text-sm text-muted/70 group-hover:text-primary/70 capitalize">
                      {level}
                    </small>
                  </div>
                </article>
              ))}
            </div>
          </m.div>
          <m.div
            variants={slideInFromRight(0.5)}
            className="w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:py-9 md:px-20"
          >
            <h3 className="text-lg md:text-xl text-primary-foreground group-hover:text-primary pb-8">
              Backend Development
            </h3>
            <div className="w-full grid grid-cols-2 gap-y-4">
              {backend.map(({ skill, level }, index) => (
                <article
                  key={index}
                  className="flex gap-4 text-primary-foreground group-hover:text-primary"
                >
                  <BadgeCheck className="size-5 mt-[2px]" />
                  <div className="flex flex-col">
                    <h4 className="text-sm md:text-base">{skill}</h4>
                    <small className="text-xs md:text-sm text-muted/70 group-hover:text-primary/70 capitalize">
                      {level}
                    </small>
                  </div>
                </article>
              ))}
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotionLayout>
  );
};
