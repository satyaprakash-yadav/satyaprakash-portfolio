// import NextAuth from "next-auth";

// import { config } from "@/lib/auth";

// const handler = NextAuth(config);

// export { handler as GET, handler as POST };

import { handlers } from "../../../../../auth";

export const { GET, POST } = handlers;
