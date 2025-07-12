import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";

// import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { EdgeStoreProvider } from "@/lib/edgestore";
// import SessionProvider from "@/providers/session-provider";
import { auth } from "../../auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.NEXTAUTH_URL
        ? `https://${process.env.NEXTAUTH_URL}`
        : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Satyaprakash — My Personal Website",
  description:
    "Hi, I am Satyaprakash. Unveil my skills, projects, and journey on my personal website. A digital portfolio reflecting my passion and expertise. Do check it out.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Satyaprakash — My Digital Canvas",
    description:
      "Hi, I am Satyaprakash. Unveil my skills, projects, and journey on my personal website. A digital portfolio reflecting my passion and expertise. Do check it out."
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyaprakash — My Digital Canvas",
    description:
      "Hi, I am Satyaprakash. Unveil my skills, projects, and journey on my personal website. A digital portfolio reflecting my passion and expertise. Do check it out."
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
