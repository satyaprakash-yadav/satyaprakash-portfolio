"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { slideInFromRight, slideInFromTop } from "@/lib/motion";

import type getData from "@/actions/get-data";

// const data_tools = [
//   {
//     id: 1,
//     image: "/tools/docker.svg",
//     name: "docker",
//   },
//   {
//     id: 2,
//     image: "/tools/figma.svg",
//     name: "figma",
//   },
//   {
//     id: 3,
//     image: "/tools/github.svg",
//     name: "github",
//   },
//   {
//     id: 4,
//     image: "/tools/illustrator.svg",
//     name: "illustrator",
//   },
//   {
//     id: 5,
//     image: "/tools/photoshop.svg",
//     name: "photoshop",
//   },
//   {
//     id: 6,
//     image: "/tools/nodejs.svg",
//     name: "nodejs",
//   },
//   {
//     id: 7,
//     image: "/tools/notion.svg",
//     name: "notion",
//   },
//   {
//     id: 8,
//     image: "/tools/postman.svg",
//     name: "postman",
//   },
//   {
//     id: 9,
//     image: "/tools/vscode.svg",
//     name: "vscode",
//   },
//   {
//     id: 10,
//     image: "/tools/xampp.svg",
//     name: "xampp",
//   },
//   {
//     id: 11,
//     image: "/tools/openai.svg",
//     name: "openai",
//   },
//   {
//     id: 12,
//     image: "/tools/anydesk.svg",
//     name: "anydesk",
//   },
//   {
//     id: 13,
//     image: "/tools/google-meet.svg",
//     name: "google meet",
//   },
//   {
//     id: 14,
//     image: "/tools/digital-ocean.svg",
//     name: "digital ocean",
//   },
//   {
//     id: 15,
//     image: "/tools/vercel.svg",
//     name: "vercel",
//   },
// ];

type ToolProps = Pick<Awaited<ReturnType<typeof getData>>, "tool">;

export const Tool = ({
  tool,
}: ToolProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="tool"
      className="mt-32"
    >
      <motion.span
        variants={slideInFromTop(0.3)}
        className="block text-center text-sm text-muted-foreground font-medium"
      >
        What I Use
      </motion.span>
      <motion.h2
        variants={slideInFromTop(0.4)}
        className="text-center text-2xl font-semibold pt-1"
      >
        Tools & Apps
      </motion.h2>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="w-full max-w-4xl mx-auto pt-8"
      >
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {tool.map((item) => (
              <li key={item.id}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className={cn(
                      "size-12 md:size-14 grayscale-[20%]",
                      item.color === "DARK" && "dark:invert-[80%]"
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
          >
            {tool.map((item) => (
              <li key={item.id}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className={cn(
                      "size-12 md:size-14 grayscale-[20%]",
                      item.color === "DARK" && "dark:invert-[80%]"
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
};
