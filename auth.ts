import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "@/lib/db";
import authConfig from "@/auth.config";
import { getAdminById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.admin.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (user.id === undefined) {
        return false;
      }
      const existingAdmin = await getAdminById(user.id);

      // Prevent sign in without email verification
      if (!existingAdmin?.emailVerified) return false;

      return true;
    },
    async jwt({ token, user, account }) {
      if (!token.sub) return token;

      const existingUser = await getAdminById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      //   if (user) {
      //       token.accessToken = user.accessToken;
      //   }

      return { ...token, ...user };
    },
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        // session.accessToken = token.accessToken;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET, // Set a secret key
});
