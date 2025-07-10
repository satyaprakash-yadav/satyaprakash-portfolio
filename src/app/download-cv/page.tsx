import type { Metadata } from "next";

import { DownloadCv } from "@/modules/resume/ui/components/download-cv/download-cv";

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.AUTH_URL
            ? `${process.env.AUTH_URL}`
            : process.env.NEXTAUTH_URL
                ? `https://${process.env.NEXTAUTH_URL}`
                : `http://localhost:${process.env.PORT || 3000}`
    ),
    title: 'Download CV — Satyaprakash',
    description:
        'Thank you for being interested in my profile. The download of my CV will start shortly.',
    openGraph: {
        url: '/',
        title: 'Download CV — Satyaprakash',
        description:
            'Thank you for being interested in my profile. The download of my CV will start shortly.'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Download CV — Satyaprakash',
        description:
            'Thank you for being interested in my profile. The download of my CV will start shortly.'
    }
};

export default function DownloadCvPage() {
    return <DownloadCv />
};
