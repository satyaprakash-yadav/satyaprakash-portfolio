import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Secure Access to Your Account",
  description:
    "Sign in to your account securely. Access personalized features, update your information, and explore a tailored digital experience. Your gateway to a seamless online presence.",
  alternates: {
    canonical: "/sign-in"
  },
  openGraph: {
    url: "/sign-in",
    title: "Sign In — Secure Access to Your Account",
    description:
      "Sign in to your account securely. Access personalized features, update your information, and explore a tailored digital experience. Your gateway to a seamless online presence."
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In — Secure Access to Your Account",
    description:
      "Sign in to your account securely. Access personalized features, update your information, and explore a tailored digital experience. Your gateway to a seamless online presence."
  }
}

const SignIn = () => {
  return (
    <SignInView />
  );
}

export default SignIn;