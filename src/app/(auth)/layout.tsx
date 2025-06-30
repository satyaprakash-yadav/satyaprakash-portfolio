import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { ViewWebsite } from "@/modules/navbar/ui/components/view-website";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session && session.user) {
    redirect("/admin");
  }

  return (
    <>
    <div className="sticky z-30 top-5 w-full flex justify-end px-5 space-x-2">
      <ViewWebsite newTab />
      <ModeToggle />
    </div>
      <div className="w-full h-[calc(100vh_-_32px)] flex flex-col justify-center items-center px-5"> 
      {children}
    </div>
    </>
  );
};

export default AuthLayout;
