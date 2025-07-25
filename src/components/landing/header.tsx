"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

import { useTypewriter, Cursor } from "react-simple-typewriter";

import { Button } from "@/components/ui/button";
import { LazyMotionLayout } from "@/components/ui/lazy-motion";

import type getData from "@/actions/get-data";

import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { DownloadCvButton } from "@/modules/resume/ui/components/download-cv-button";
import ShinyText from "../shiny-text";
import { BackgroundLines } from "../background-lines";
import CircularText from "../circular-text";

type HeaderProps = Pick<Awaited<ReturnType<typeof getData>>, 'miscellaneous'>;

export const Header = ({
  miscellaneous,
}: HeaderProps) => {
  const [text] = useTypewriter({
    words: miscellaneous
      ? miscellaneous.titles.map((title) => title.name)
      : [],
    loop: true,
  });

  return (
    <LazyMotionLayout>
      <m.header
        initial="hidden"
        animate="visible"
        id="home"
        className="h-screen pt-20 min-h-[600px] max-h-[600px]"
      >
        <div className="text-center h-full relative">
          <span className="text-sm text-muted-foreground font-medium">
            <ShinyText text="Hello, I am" disabled={false} speed={3} className='custom-class' />
          </span>
          <div className="flex flex-col justify-start items-center">
            <Link href="/" scroll={false} title="Home">
              <h1 className="text-3xl xs:text-4xl sm:text-[2.5rem] font-medium leading-7 py-4">
                Satyaprakash Yadav
              </h1>
            </Link>
          </div>
          <div className="pl-[0.1rem] tracking-[0.4rem]">
            <span className="text-gradient xs:text-base sm:text-lg font-medium">
              {text}
            </span>
            <Cursor cursorColor="#444444" cursorStyle="|" />
          </div>
          <div className="inline-flex space-x-3 pt-9">
            <m.div variants={slideInFromLeft(0.5)}>
              <DownloadCvButton />
            </m.div>
            <m.div variants={slideInFromRight(0.5)}>
              <Button variant="default" asChild>
                <Link href="#contact" title="Let's Talk">
                  <MessageCircle className="mr-2 w-5 h-5" /> Let&apos;s Talk
                </Link>
              </Button>
            </m.div>
          </div>
          <div className="flex justify-between items-end">
            <div className='flex flex-col items-center gap-4'>
              <m.div variants={slideInFromLeft(0.2)} className="flex">
                <Link
                  href={miscellaneous ? miscellaneous.facebookUrl : "#"}
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
                >
                  <FaFacebookSquare className="text-white dark:text-zinc-950 size-4" />
                </Link>
              </m.div>
              <m.div variants={slideInFromLeft(0.3)} className="flex">
                <Link
                  href={miscellaneous ? miscellaneous.linkedinUrl : "#"}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
                >
                  <FaLinkedin className="text-white dark:text-zinc-950 size-4" />
                </Link>
              </m.div>
              <m.div variants={slideInFromLeft(0.4)} className="flex">
                <Link
                  href={miscellaneous ? miscellaneous.githubUrl : "#"}
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
                >
                  <FaGithub className="text-white dark:text-zinc-950 w-4 h-4" />
                </Link>
              </m.div>
              <m.div
                variants={slideInFromLeft(0.5)}
                className='flex after:content-[""] after:w-[1px] after:h-[2rem] after:bg-primary'
              />
            </div>
            <BackgroundLines className="h-[20rem]">
              <div className="grow flex justify-center">
                <div className="w-60 h-96 xs:w-72 xs:h-96 md:w-[22rem] md:h-[30rem] absolute">
                  <CircularText
                    text="SAR*SOLUTION*STARTUP*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                  />
                </div>
              </div>
            </BackgroundLines>
            <div className="flex flex-col items-center justify-center gap-4">
              <m.div variants={slideInFromRight(0.4)} className="relative">
                <div className="mouse" />
              </m.div>
              <m.div variants={slideInFromRight(0.5)}>
                <Link
                  href="#contact"
                  title="Scroll Down"
                  className="text-primary hover:opacity-60 transition-opacity duration-300 ease-in-out flex justify-center items-center"
                >
                  <p className="text-sm scroll__down mb-20">
                    Scroll Down
                  </p>
                </Link>
              </m.div>
            </div>
          </div>
        </div>
      </m.header>
    </LazyMotionLayout>
  );
};
