// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { compare } from "bcrypt";

// import { getServerSession } from "next-auth";
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type {
//     GetServerSidePropsContext,
//     NextApiRequest,
//     NextApiResponse,
// } from "next";

// import { prismadb } from "./prismadb";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// export const config = {
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             credentials: {
//                 username: {
//                     label: "Name",
//                     type: "text"
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password"
//                 }
//             },
//             async authorize(credentials: any) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Email and password are required.");
//                 }

//                 const user = await prismadb.user.findUnique({
//                     where: {
//                         email: credentials.email,
//                     }
//                 });

//                 if (!user || !user.hashedPassword) {
//                     throw new Error("Incorrect email or password");
//                 }

//                 const isCorrectPassword = await compare(
//                     credentials.password,
//                     user.hashedPassword
//                 );

//                 if (!isCorrectPassword) {
//                     throw new Error("Incorrect email or password");
//                 }

//                 return user;
//             }
//         })
//     ],
//     pages: {
//         signIn: "/sign-in",
//         error: "/sign-in"
//     },
//     debug: process.env.NODE_ENV !== "production",
//     adapter: PrismaAdapter(prismadb),
//     session: {
//         strategy: "jwt"
//     },
//     jwt: {
//         secret: process.env.NEXTAUTH_JWT_SECRET
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         session: async ({ session, token, trigger, newSession }) => {
//             if (session?.user) {
//                 session.user.id = token.sub;
//             }

//             if (trigger === "update" && newSession?.name && newSession?.email) {
//                 session.user.name = newSession.name;
//                 session.user.email = newSession.email;
//             };

//             return session;
//         },
//         jwt: async ({ user, token, trigger, session }) => {
//             if (user) {
//                 token.sub = user.id;
//             }

//             if (trigger === "update" && session?.name && session?.email) {
//                 token.name = session.name;
//                 token.email = session.email;
//             }

//             return token;
//         }
//     }
// } satisfies NextAuthOptions;

// export function auth(
//     ...args:
//         | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//         | [NextApiRequest, NextApiResponse]
//         | []
// ) {
//     return getServerSession(...args, config);
// };