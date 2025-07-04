"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

import { useTypewriter, Cursor } from "react-simple-typewriter";

import { Button } from "@/components/ui/button";

import type getData from "@/actions/get-data";

import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

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
    <motion.header
      initial="hidden"
      animate="visible"
      id="home"
      className="h-screen pt-28 min-h-[900px] max-h-[900px]"
    >
      <div className="text-center h-full relative">
        <h1 className="text-sm text-muted-foreground font-medium">
          Hello, I am
        </h1>
        <div className="flex flex-col justify-start items-center">
          <Link href="/" scroll={false}>
            <h2 className="text-3xl xs:text-4xl sm:text-[2.5rem] font-medium leading-7 py-4">
              Satyaprakash Yadav
            </h2>
          </Link>
        </div>
        <div className="pl-[0.1rem] tracking-[0.4rem]">
          <span className="text-gradient xs:text-base sm:text-lg font-medium">
            {text}
          </span>
          <Cursor cursorColor="#444444" cursorStyle="|" />
        </div>
        <div className="inline-flex space-x-3 pt-9">
          <motion.div variants={slideInFromLeft(0.5)}>
            <Button variant="outline" asChild>
              <Link
                href={miscellaneous ? miscellaneous.cvUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={slideInFromRight(0.5)}>
            <Button variant="default" asChild>
              <Link href="#contact">
                <MessageCircle className="mr-2 w-5 h-5" /> Let&apos;s Talk
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="flex justify-between items-end">
          <div className='flex flex-col items-center gap-4'>
            <motion.div variants={slideInFromLeft(0.2)} className="flex">
              <Link
                href={miscellaneous ? miscellaneous.facebookUrl : "#"}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
              >
                <FaFacebookSquare className="text-white dark:text-zinc-950 size-4" />
              </Link>
            </motion.div>
            <motion.div variants={slideInFromLeft(0.3)} className="flex">
              <Link
                href={miscellaneous ? miscellaneous.linkedinUrl : "#"}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
              >
                <FaLinkedin className="text-white dark:text-zinc-950 size-4" />
              </Link>
            </motion.div>
            <motion.div variants={slideInFromLeft(0.4)} className="flex">
              <Link
                href={miscellaneous ? miscellaneous.githubUrl : "#"}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
              >
                <FaGithub className="text-white dark:text-zinc-950 w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              variants={slideInFromLeft(0.5)}
              className='flex after:content-[""] after:w-[1px] after:h-[2rem] after:bg-primary'
            />
          </div>
          <div className="grow flex justify-center">
            <div className="me w-60 h-96 xs:w-72 xs:h-96 md:w-[22rem] md:h-[30rem]">
              <Image
                src="/web-developer.png"
                alt="me"
                width={250}
                height={250}
                priority
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.div variants={slideInFromRight(0.4)} className="relative">
              <div className="mouse" />
            </motion.div>
            <motion.div variants={slideInFromRight(0.5)}>
              <Link
                href="#contact"
                className="text-primary hover:opacity-60 transition-opacity duration-300 ease-in-out flex justify-center items-center"
              >
                <p className="text-sm [writing-mode:vertical-lr]">
                  Scroll Down
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
