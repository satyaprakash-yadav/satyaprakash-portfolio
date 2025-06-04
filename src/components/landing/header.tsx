"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

import { useTypewriter, Cursor } from "react-simple-typewriter";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const [text] = useTypewriter({
    words: ["Django RestAPI Developer", "Penetration Tester"],
    loop: true,
  });

  return (
    <header id="home" className="h-screen pt-28 overflow-hidden max-h-[900px]">
      <div className="text-center h-full relative">
        <h1 className="text-sm text-muted-foreground">Hello, I am</h1>
        <Link href="/">
          <h2 className="text-[2.5rem] font-medium leading-7 py-6">
            Satyaprakash Yadav
          </h2>
        </Link>
        <div className="pl-[0.1rem] tracking-[0.4rem]">
          <span className="text-gradient">{text}</span>
          <Cursor cursorColor="#444444" cursorStyle="|" />
        </div>
        <div className="inline-flex space-x-3 pt-9">
          <Button variant="outline" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Download CV
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="#contact">
              <MessageCircle className="mr-2 w-5 h-5" /> Let&apos;s Talk
            </Link>
          </Button>
        </div>
        <div className="flex justify-between items-end">
          <div className='flex flex-col items-center gap-4 after:content-[""] after:w-[1px] after:h-[2rem] after:bg-primary'>
            <Link
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
            >
              <FaFacebookSquare className="text-white dark:text-zinc-950 w-4 h-4" />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
            >
              <FaLinkedin className="text-white dark:text-zinc-950 w-4 h-4" />
            </Link>
            <Link
              href="#"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out"
            >
              <FaGithub className="text-white dark:text-zinc-950 w-4 h-4" />
            </Link>
          </div>
          <div className="grow flex justify-center">
            <div className="me w-72 h-96 md:w-[22rem] md:h-[30rem]">
              <Image
                src="/web-developer.png"
                alt="me"
                width={250}
                height={250}
                priority
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-4 transform">
            <div className="relative">
              <div className="mouse" />
            </div>
            <Link
              href="#contact"
              className="text-primary hover:opacity-60 transition-opacity duration-300 ease-in-out"
            >
              <p className="text-sm [writing-mode:vertical-lr]">Scroll Down</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
