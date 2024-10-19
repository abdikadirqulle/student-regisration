import bcrypt from "bcryptjs";

import GitHub from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import Credential from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { getAdminByEmail } from "./data/user";
import jwt from "jsonwebtoken"; // Optional: If you're generating a token

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credential({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getAdminByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          //   if (passwordsMatch) return user
          if (passwordsMatch) {
            // Optional: Generate a JWT token for the session
            const accessToken = jwt.sign(
              { email: user.email, id: user.id }, // Payload
              process.env.JWT_SECRET || "secret", // Secret key
              { expiresIn: "1h" }
            );

            console.log(
              "providers access token has been generated",
              accessToken
            );
            // Return the user object with the token

            return {
              id: user.id,
              email: user.email,
              accessToken, // Add the token here
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
