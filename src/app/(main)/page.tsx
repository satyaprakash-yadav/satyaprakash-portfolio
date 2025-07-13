// Server action getData
import getData from "@/actions/get-data";

import { Person, WithContext } from "schema-dts";

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

  // create JSON-LD
  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Satyaprakash",
    alternateName: "SARKS",
    url: "https://www.satyaprakash.com",
    image: "https://www.satyaprakash.com/satyaprakash.png",
    jobTitle: miscellaneous
      ? miscellaneous.titles.map((title) => title.name)
      : ["Web Developer", "Frontend Developer"],
    gender: "Male",
    workLocation: "India",
    description: "Satyaprakash is an enthusiastic and passionate web developer based in India with more than half a decade of experience dedicated to deliver top-notch solutions and facilitate project success",
    sameAs: [
      miscellaneous
        ? miscellaneous.facebookUrl
        : "#",
      miscellaneous ? miscellaneous.twitterUrl : "#",
      miscellaneous
        ? miscellaneous.linkedinUrl
        : "#",
      miscellaneous ? miscellaneous.githubUrl : "#",
      miscellaneous
        ? miscellaneous.instagramUrl
        : "#"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
