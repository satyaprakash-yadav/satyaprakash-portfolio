"use client";

import { cn } from "@/lib/utils";

import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

import { Footer } from "@/components/secured/footer";

import { Sidebar } from "@/modules/dashboard/ui/components/sidebar";
import { Navbar } from "@/modules/navbar/ui/components/navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";

interface Props {
  children: React.ReactNode;
}

const AdminRouteLayout = ({ children }: Props) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
      <EdgeStoreProvider>
        <Sidebar />
        <main
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <Navbar />
          <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
        </main>
        <footer
          className={cn(
            "transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <Footer />
        </footer>
      </EdgeStoreProvider>
  );
};

export default AdminRouteLayout;
