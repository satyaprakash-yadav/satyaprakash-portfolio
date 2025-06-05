import { About } from "@/components/landing/about";
import { Header } from "@/components/landing/header";
import { Expertise } from "@/components/landing/expertise";
import { Experience } from "@/components/landing/experience";

import { ModeToggle } from "@/components/mode-toggle";

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
    </main>
  );
}
