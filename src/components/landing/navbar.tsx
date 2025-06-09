"use client";

import {
  Book,
  ClipboardCheck,
  FolderGit2,
  GraduationCap,
  Home,
  MessageCircle,
  User,
} from "lucide-react";

import { useAnchor } from "@/hooks/use-anchor";

import { NavButton } from "@/modules/navbar/ui/components/nav-button";

export const Navbar = () => {
  const currentAnchor = useAnchor();

  return (
    <nav className="bg-black/30 w-max py-3 px-7 fixed bottom-8 z-30 mx-auto inset-x-0 flex gap-3 rounded-full backdrop-blur-lg">
      <NavButton
        name="Home"
        anchor="#home"
        icon={Home}
        active={
          currentAnchor === "#home" || currentAnchor === "" ? true : false
        }
      />
      <NavButton
        name="About"
        anchor="#about"
        icon={User}
        active={currentAnchor === "#about" ? true : false}
      />
      <NavButton
        name="Experience"
        anchor="#experience"
        icon={Book}
        active={currentAnchor === "#experience" ? true : false}
      />
      <NavButton
        name="Expertise"
        anchor="#expertise"
        icon={ClipboardCheck}
        active={currentAnchor === "#expertise" ? true : false}
        hideMobile
      />
      <NavButton
        name="Qualification"
        anchor="#qualification"
        icon={GraduationCap}
        active={currentAnchor === "#qualification" ? true : false}
      />
      <NavButton
        name="Portfolio"
        anchor="#portfolio"
        icon={FolderGit2}
        active={currentAnchor === "#portfolio" ? true : false}
      />
      <NavButton
        name="Contact"
        anchor="#contact"
        icon={MessageCircle}
        active={currentAnchor === "#contact" ? true : false}
      />
    </nav>
  );
};
