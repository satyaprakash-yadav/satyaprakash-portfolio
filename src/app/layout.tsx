import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

const poppins = Poppins({
  style: ["normal"],
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satyaprakash — My Personal Website",
  description:
    "Hi! I am Satyaprakash and this is my personal website. Take a look at some of my projects at the portfolio section and do contact me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
