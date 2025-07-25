"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Link from "next/link";
import { Briefcase, FolderGit2, Laptop } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LazyMotionLayout } from "@/components/ui/lazy-motion";
import {
  CardBody,
  CardContainer,
  CardItem
} from "@/components/ui/3d-card";

import getData from "@/actions/get-data";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

type AboutProps = Pick<Awaited<ReturnType<typeof getData>>, "about">;

export const About = ({
  about,
}: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotionLayout>
      <m.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        id="about"
        className="md:mt-32"
      >
        <m.span
          variants={slideInFromTop(0.3)}
          className="block text-center text-sm text-muted-foreground font-medium"
        >
          Get To Know
        </m.span>
        <m.h2
          variants={slideInFromTop(0.4)}
          className="text-center text-2xl font-semibold pt-1"
        >
          About Me
        </m.h2>
        <div className="w-full grid lg:grid-cols-7 gap-12 md:gap-24 2xl:gap-48 pt-12">
          <m.div
            variants={slideInFromLeft(0.3)}
            className="lg:col-span-3 w-4/5 md:w-1/2 mx-auto lg:w-full aspect-square rounded-2xl bg-gradient-to-tr from-transparent via-primary to-transparent"
          >
            <CardContainer className="relative px-8">
              <CardBody className="relative sm:w-[27rem] size-auto">
                <CardItem translateZ="100">
                  <Image
                    src="/programming.svg"
                    alt="about"
                    height={500}
                    width={500}
                    sizes="(max-width: 768px) 50vw, 100vw"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </m.div>
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
              <m.article
                variants={slideInFromRight(0.3)}
                className="w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8">
                <Briefcase className="size-6 text-primary-foreground group-hover:text-primary mb-4" />
                <h3 className="text-base text-primary-foreground group-hover:text-primary pb-2">
                  Experience
                </h3>
                <small className="text-xs text-center font-normal text-muted/60 group-hover:text-primary/80">
                  {/* 1.5+ Years Working */}
                  {about?.experience}
                </small>
              </m.article>
              <m.article
                variants={slideInFromRight(0.4)}
                className="w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8"
              >
                <FolderGit2 className="w-6 h-6 text-primary-foreground group-hover:text-primary mb-4" />
                <h3 className="text-base text-primary-foreground group-hover:text-primary pb-2">
                  Projects
                </h3>
                <small className="text-xs text-center font-normal text-muted/60 group-hover:text-primary/80">
                  {/* 15+ Completed */}
                  {about?.project}
                </small>
              </m.article>
              <m.article
                variants={slideInFromRight(0.5)}
                className="w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8">
                <Laptop className="w-6 h-6 text-primary-foreground group-hover:text-primary mb-4" />
                <h3 className="text-base text-primary-foreground group-hover:text-primary pb-2">
                  Worlwide
                </h3>
                <small className="text-xs text-center font-normal text-muted/60 group-hover:text-primary/80">
                  {/* Remotely Available */}
                  {about?.worldwide}
                </small>
              </m.article>
            </div>
            <m.p
              variants={slideInFromRight(0.4)}
              className="text-muted-foreground font-normal text-justify">
              {/* I am an enthusiastic and passionate web developer based in India
            with nearly half a decade of experience dedicated to deliver
            top-notch solutions and facilitate project success. */}
              {about?.summary}
            </m.p>
            <m.div variants={slideInFromRight(0.5)}>
              <Button variant="default" asChild>
                <Link href="#contact" title="Let's Talk">
                  Let&apos;s Talk
                </Link>
              </Button>
            </m.div>
          </div>
        </div>
      </m.section>
    </LazyMotionLayout>
  );
};
