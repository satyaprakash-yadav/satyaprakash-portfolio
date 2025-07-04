// Server action getData
import getData from "@/actions/get-data";

import { Tool } from "@/components/landing/tool";
import { About } from "@/components/landing/about";
import { Navbar } from "@/components/landing/navbar";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Contact } from "@/components/landing/contact";
import { Portfolio } from "@/components/landing/portfolio";
import { Expertise } from "@/components/landing/expertise";
import { Experience } from "@/components/landing/experience";
import { Qualification } from "@/components/landing/qualification";

import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
  const {
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation,
    education,
    experience,
    portfolioWithBlur,
    miscellaneous,
    tool,
  } = await getData();

  return (
    <>
      <div className="sticky z-30 top-5 w-full flex justify-end px-5">
        <ModeToggle />
      </div>
      <Navbar />
      <main className="container px-4 md:px-8 mx-auto relative -mt-14 overflow-x-hidden">
        <Header miscellaneous={miscellaneous} />
        <About about={about} />
        <Experience frontend={frontend} backend={backend} />
        <Expertise
          seooptimization={seooptimization}
          webdevelopment={webdevelopment}
          contentcreation={contentcreation}
        />
        <Qualification education={education} experience={experience} />
        <Portfolio portfolioWithBlur={portfolioWithBlur} />
        <Tool tool={tool} />
        <Contact miscellaneous={miscellaneous} />
      </main>
      <Footer miscellaneous={miscellaneous} />
    </>
  );
}
