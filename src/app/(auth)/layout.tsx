import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session && session.user) {
    redirect("/admin");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
