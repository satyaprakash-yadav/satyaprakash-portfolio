import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import SessionProvider from "@/providers/session-provider";

const poppins = Poppins({
  style: ["normal"],
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satyaprakash — My Personal Website",
  description:
    "Hi! I am Satyaprakash and this is my personal website. Take a look at some of my projects at the portfolio section and do contact me.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
