import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import { prismadb } from "@/lib/prismadb";

export default {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "John Doe" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                // if (!credentials?.email || !credentials?.password) {
                //     throw new Error('Email and password are required.');
                // }

                // const { email, password } = credentials;

                // if (!(typeof email === 'string' && typeof password === 'string')) {
                //     throw new Error('Email and password are required.');
                if (
                    !credentials.email ||
                    !credentials.password ||
                    typeof credentials.email !== "string" ||
                    typeof credentials.password !== "string"
                ) {
                    return null;
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if (!user || !user.hashedPassword) {
                //     throw new Error('Incorrect email or password.');
                // }

                // const passwordsMatch = await compare(password, user.hashedPassword);

                // if (!passwordsMatch) {
                //     throw new Error('Incorrect email or password.');
                if (
                    !user ||
                    !user.hashedPassword ||
                    !(await compare(credentials.password, user.hashedPassword))
                ) {
                    return null;
                }

                return user;
            }
        })
    ]
} satisfies NextAuthConfig;