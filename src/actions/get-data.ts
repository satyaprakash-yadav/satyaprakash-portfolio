import { prismadb } from "@/lib/prismadb";
import addBlurredDataUrls from "@/lib/image-blur";
import type {
  About,
  Experience,
  Expertise,
  Prisma,
  Qualification,
  Tool,
} from "@prisma/client";

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
}>;

type PortfolioWithBlur = PortfolioWithTags & {
  blurredDataUrl?: string;
};

type MiscellaneousWithTitles = Prisma.MiscellaneousGetPayload<{
  include: { titles: true },
}>;

interface DataProps {
  about: About | null;
  frontend: Experience[];
  backend: Experience[];
  seooptimization: Expertise[];
  webdevelopment: Expertise[];
  contentcreation: Expertise[];
  education: Qualification[];
  experience: Qualification[];
  portfolioWithBlur: PortfolioWithBlur[];
  miscellaneous: MiscellaneousWithTitles | null;
  tool: Tool[];
}

const getData = async (): Promise<DataProps> => {
  const aboutPromise = prismadb.about.findFirst();

  const experiencesPromise = prismadb.experience.findMany({
    where: {
      type: { in: ["FRONTEND", "BACKEND"] }
    }
  });

  const expertisesPromise = prismadb.expertise.findMany({
    where: {
      type: { in: ["SEOOPTIMIZATION", "WEBDEVELOPMENT", "CONTENTCREATION"] }
    }
  });

  const qualificationsPromise = prismadb.qualification.findMany({
    where: {
      type: { in: ["EDUCATION", "EXPERIENCE"] }
    },
    orderBy: {
      id: "desc"
    }
  });

  const portfolioPromise = prismadb.portfolio.findMany({
    take: 6,
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const miscellaneousPromise = prismadb.miscellaneous.findFirst({
    include: {
      titles: true
    }
  });

  const toolPromise = prismadb.tool.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  const [
    about,
    experiences,
    expertises,
    qualifications,
    portfolio,
    miscellaneous,
    tool,
  ] = await Promise.all([
    aboutPromise,
    experiencesPromise,
    expertisesPromise,
    qualificationsPromise,
    portfolioPromise,
    miscellaneousPromise,
    toolPromise,
  ]);

  const frontend = [];
  const backend = [];
  const seooptimization = [];
  const webdevelopment = [];
  const contentcreation = [];
  const education = [];
  const experience = [];

  for (const exp of experiences) {
    if (exp.type === "FRONTEND") frontend.push(exp);
    else if (exp.type === "BACKEND") backend.push(exp);
  }

  for (const expertise of expertises) {
    if (expertise.type === "SEOOPTIMIZATION") seooptimization.push(expertise);
    else if (expertise.type === "WEBDEVELOPMENT")
      webdevelopment.push(expertise);
    else if (expertise.type === "CONTENTCREATION")
      contentcreation.push(expertise);
  }

  for (const qualification of qualifications) {
    if (qualification.type === "EDUCATION") education.push(qualification);
    else if (qualification.type === "EXPERIENCE")
      experience.push(qualification);
  }

  const portfolioWithBlur = await addBlurredDataUrls(portfolio);

  return {
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
  };
};

export default getData;
