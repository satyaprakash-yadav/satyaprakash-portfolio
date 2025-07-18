/* eslint-disable @typescript-eslint/no-explicit-any */
// import NextAuth from "next-auth";

import { auth } from "./auth";
import {
    authRoutes,
    publicRoutes,
    apiAuthPrefix,
    DEFAULT_SIGNIN_REDIRECT,
} from "./routes";

// import authConfig from "./auth.config";

// export const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
    const { nextUrl } = req;
    const isSignedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute || isPublicRoute) {
        return;
    };

    if (isAuthRoute) {
        if (isSignedIn) {
            return Response.redirect(
                new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl).toString()
            );
        }
        return;
    }

    if (!isSignedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        };

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(
            new URL(
                `/sign-in?callbackUrl=${encodedCallbackUrl}`,
                nextUrl
            ).toString()
        )
    };

    return;
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}