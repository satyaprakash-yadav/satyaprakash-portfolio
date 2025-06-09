"use client";

import Link from "next/link";
import {
  Book,
  ClipboardCheck,
  FolderGit2,
  GraduationCap,
  Home,
  MessageCircle,
  User,
} from "lucide-react";

import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <nav className="bg-black/30 w-max py-3 px-7 fixed bottom-8 z-30 mx-auto inset-x-0 flex gap-3 rounded-full backdrop-blur-lg">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#home">
          <Home className="size-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#about">
          <User className="size-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#experience">
          <Book className="size-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#expertise">
          <ClipboardCheck className="size-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#qualification">
          <GraduationCap className="size-6" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#portfolio">
          <FolderGit2 className="size-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full text-white px-0 size-8 xs:w-11 xs:h-11"
        asChild
      >
        <Link href="#contact">
          <MessageCircle className="size-5" />
        </Link>
      </Button>
    </nav>
  );
};
