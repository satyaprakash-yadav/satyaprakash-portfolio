// Server action getData
import getData from "@/actions/get-data";

import { WebPage, WithContext } from "schema-dts";

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
import { Testimonials } from "@/components/landing/testimonials";

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
    portfolioWithTags,
    miscellaneous,
    tool,
  } = await getData();

  // create JSON-LD
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": process.env.AUTH_URL,
    name: "Satyaprakash",
    alternateName: "Satyaprakash Yadav",
    url: process.env.AUTH_URL,
    image: {
      "@type": "ImageObject",
      "@id": process.env.AUTH_URL + "/satyaprakash.png",
      url: process.env.AUTH_URL + "/satyaprakash.png",
      contentUrl: process.env.AUTH_URL + "/satyaprakash.png",
      width: {
        "@type": "QuantitativeValue",
        value: 512
      },
      height: {
        "@type": "QuantitativeValue",
        value: 512
      }
    },
    description: "Satyaprakash is an enthusiastic and passionate web developer based in India with more than half a decade of experience dedicated to deliver top-notch solutions and facilitate project success",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": process.env.AUTH_URL,
      url: process.env.AUTH_URL,
      name: "Satyaprakash",
      description:
        "Satyaprakash is an enthusiastic and passionate web developer based in India with more than half a decade of experience dedicated to deliver top-notch solutions and facilitate project success",
      inLanguage: "en-US",
      publisher: {
        "@type": "Person",
        name: "Satyaprakash",
        url: process.env.AUTH_URL,
        sameAs: [
          miscellaneous
            ? miscellaneous.facebookUrl
            : "https://www.facebook.com/satyaprakash",
          miscellaneous
            ? miscellaneous.twitterUrl
            : "https://twitter.com/satyaprakash",
          miscellaneous
            ? miscellaneous.linkedinUrl
            : "https://www.linkedin.com/in/satyaprakash-yadav",
          miscellaneous
            ? miscellaneous.githubUrl
            : "https://github.com/satyaprakash-yadav",
          miscellaneous
            ? miscellaneous.instagramUrl
            : "https://www.instagram.com/satyaprakash-yadav"
        ],
        image: {
          "@type": "ImageObject",
          "@id": process.env.AUTH_URL + "/satyaprakash.png",
          url: process.env.AUTH_URL + "/satyaprakash.png",
          contentUrl: process.env.AUTH_URL + "/satyaprakash.png",
          width: {
            "@type": "QuantitativeValue",
            value: 512
          },
          height: {
            "@type": "QuantitativeValue",
            value: 512
          }
        }
      }
    },
    about: {
      "@type": "Person",
      name: "Satyaprakash",
      url: process.env.AUTH_URL,
      sameAs: [
        miscellaneous
          ? miscellaneous.facebookUrl
          : "https://www.facebook.com/satyaprakash",
        miscellaneous
          ? miscellaneous.twitterUrl
          : "https://twitter.com/satyaprakash",
        miscellaneous
          ? miscellaneous.linkedinUrl
          : "https://www.linkedin.com/in/satyaprakash-yadav",
        miscellaneous
          ? miscellaneous.githubUrl
          : "https://github.com/satyaprakash-yadav",
        miscellaneous
          ? miscellaneous.instagramUrl
          : "https://www.instagram.com/satyaprakash"
      ],
      image: {
        "@type": "ImageObject",
        "@id": process.env.AUTH_URL + "/satyaprakash.png",
        url: process.env.AUTH_URL + "/satyaprakash.png",
        contentUrl: process.env.AUTH_URL + "/satyaprakash.png",
        width: {
          "@type": "QuantitativeValue",
          value: 512
        },
        height: {
          "@type": "QuantitativeValue",
          value: 512
        }
      }
    }
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
        <Portfolio portfolioWithTags={portfolioWithTags} />
        <Tool tool={tool} />
        <Testimonials />
        <Contact miscellaneous={miscellaneous} />
      </main>
      <Footer miscellaneous={miscellaneous} />
    </>
  );
}
