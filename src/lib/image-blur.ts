import { Prisma } from "@prisma/client";
import { getPlaiceholder } from "plaiceholder";

const getBase64 = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const buffer = await response.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
};

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
}>;

type PortfolioWithBlur = PortfolioWithTags & {
  blurredDataUrl?: string;
};

export default async function addBlurredDataUrls(
  portfolios: PortfolioWithBlur[]
): Promise<PortfolioWithBlur[]> {
  // Make all requests at once instead of awaiting each one - avoiding a waterfall
  const base64Promises = portfolios.map((portfolio) =>
    getBase64(portfolio.image!)
  );

  // Resolve all requests in order
  const base64Results = await Promise.all(base64Promises);

  const portfolioWithBlur: PortfolioWithBlur[] = portfolios.map(
    (portfolio, index) => {
      portfolio.blurredDataUrl = base64Results[index];
      return portfolio;
    }
  );

  return portfolioWithBlur;
}
