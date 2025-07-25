import { MetadataRoute } from "next";
import { prismadb } from "@/lib/prismadb";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.AUTH_URL
        ? `${process.env.AUTH_URL}`
        : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : `http://localhost:${process.env.PORT || 3000}`;

    const portfolios = await prismadb.portfolio.findMany({
        orderBy: {
            createdAt: "desc",
        }
    });

    const portfoliosMap: MetadataRoute.Sitemap = portfolios.map((portfolio) => ({
        url: portfolio.demoUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5
    }));

    const defaultMap: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/sign-in`,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sign-up`,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8
        },
        {
            url: `${baseUrl}/terms-and-conditions`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8
        }
    ];

    return [...defaultMap, ...portfoliosMap];
}