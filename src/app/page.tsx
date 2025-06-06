import { About } from "@/components/landing/about";
import { Header } from "@/components/landing/header";
import { Expertise } from "@/components/landing/expertise";
import { Experience } from "@/components/landing/experience";
import { Qualification } from "@/components/landing/qualification";

import { ModeToggle } from "@/components/mode-toggle";
import { Portfolio } from "@/components/landing/portfolio";

export default function Home() {
  return (
    <main className="container px-4 md:px-8 mx-auto relative">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
      <Header />
      <About />
      <Experience />
      <Expertise />
      <Qualification />
      <Portfolio />
    </main>
  );
}
