"use client";

import { usePathname } from "next/navigation";

export const PageTitle = () => {
  const pathname = usePathname();

  let pageTitle = "";

  if (pathname === "/admin") {
    pageTitle = "Dashboard";
  } else if (pathname.includes("/admin/about")) {
    pageTitle = "About";
  } else if (pathname.includes("/admin/experience")) {
    pageTitle = "Experience";
  } else if (pathname.includes("/admin/expertise")) {
    pageTitle = "Expertise";
  } else if (pathname.includes("/admin/qualification")) {
    pageTitle = "Qualification";
  } else if (pathname.includes("/admin/portfolio")) {
    pageTitle = "Portfolio";
  } else if (pathname.includes("/admin/portfolio/")) {
    pageTitle = "Portfolio";
  } else if (pathname.includes("/admin/link")) {
    pageTitle = "Link";
  } else if (pathname.includes("/admin/miscellaneous")) {
    pageTitle = "Miscellaneous";
  } else if (pathname.includes("/admin/account")) {
    pageTitle = "Account";
  } else if (pathname.includes("/admin/tool")) {
    pageTitle = "Tool & Apps";
  } else if (pathname.includes("/admin/resume")) {
    pageTitle = "Resume";
  }

  return <h1 className="font-bold">{pageTitle}</h1>;
};
