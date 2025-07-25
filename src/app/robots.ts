import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.AUTH_URL
        ? `${process.env.AUTH_URL}`
        : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : `http://localhost:${process.env.PORT || 3000}`;

    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/auth/", "/privacy-policy", "/terms-and-conditions"],
            disallow: ["/admin/", "/api/", "/download-cv"]
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}
