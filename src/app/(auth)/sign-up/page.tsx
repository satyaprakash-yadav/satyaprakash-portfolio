import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — Satyaprakash",
  description:
    "Create your account and embark on a personalized digital experience. Sign up now to unlock exclusive features, share your story, and connect with a world of opportunities.",
  alternates: {
    canonical: "/sign-up",
  },
  openGraph: {
    url: "/sign-up",
    title: "Sign Up — Satyaprakash",
    description:
      "Create your account and embark on a personalized digital experience. Sign up now to unlock exclusive features, share your story, and connect with a world of opportunities."
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up — Satyaprakash",
    description:
      "Create your account and embark on a personalized digital experience. Sign up now to unlock exclusive features, share your story, and connect with a world of opportunities."
  }
}

const SignUp = () => {
    return ( 
        <SignUpView />
    );
}
 
export default SignUp;