"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";
import { motion, useInView } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import type getData from "@/actions/get-data";

import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

type FooterProps = Pick<Awaited<ReturnType<typeof getData>>, "miscellaneous">;

export const Footer = ({
  miscellaneous,
}: FooterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="footer"
      className="mt-32 bg-primary"
    >
      <div className="container px-4 md:px-8 mx-auto w-full flex flex-col py-12">
        <motion.div
          variants={slideInFromLeft(0.2)}
          className="flex justify-center"
        >
          <Button
            variant="link"
            className="text-primary-foreground text-4xl font-medium uppercase"
            asChild
          >
            <Link href="#home">Satyaprakash</Link>
          </Button>
        </motion.div>
        <motion.ul
          variants={slideInFromRight(0.3)}
          className="w-full max-w-3xl mx-auto flex flex-col items-center md:flex-row justify-between mt-8"
        >
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#home">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#about">About</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#experience">Experience</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#expertise">Expertise</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#qualification">Qualification</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#portfolio">Portfolio</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#tool">Tool</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#contact">Contact</Link>
            </Button>
          </li>
        </motion.ul>
        <motion.div
          variants={slideInFromLeft(0.4)}
          className="flex justify-center gap-4 mt-8"
        >
          <Button variant="secondary" size="icon" asChild>
            <Link
              href={`${miscellaneous ? miscellaneous.facebookUrl : "#"}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Facebook'
            >
              <FaFacebook className="size-5" />
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link
              href={`${miscellaneous ? miscellaneous.instagramUrl : "#"}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Instagram'
            >
              <FaInstagram className="size-5" />
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link
              href={`${miscellaneous ? miscellaneous.twitterUrl : "#"}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Twitter'
            >
              <FaTwitter className="size-5" />
            </Link>
          </Button>
          <Button variant='secondary' size='icon' asChild>
            <Link
              href={`${miscellaneous ? miscellaneous.linkedinUrl : '#'}`}
              aria-label='LinkedIn'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin className='size-5' />
            </Link>
          </Button>
        </motion.div>
        <motion.div
          variants={slideInFromRight(0.5)}
          className="flex justify-center my-16"
        >
          <small className="text-muted">
            Created by
            <Button variant="link" className="text-muted text-xs px-1" asChild>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Satyaprakash Yadav
              </Link>
            </Button>
            &copy; {new Date().getFullYear()}.
          </small>
        </motion.div>
      </div>
    </motion.footer>
  );
};
