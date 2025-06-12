"use client";

import { cn } from "@/lib/utils";

import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

import { Footer } from "@/components/secured/footer";

import { Sidebar } from "@/modules/dashboard/ui/components/sidebar";
import { Navbar } from "@/modules/navbar/ui/components/navbar";

interface Props {
  children: React.ReactNode;
}

const AdminRouteLayout = ({ children }: Props) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-800 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Navbar />
        <div className="container pt-8 pb-8">{children}</div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
};

export default AdminRouteLayout;
