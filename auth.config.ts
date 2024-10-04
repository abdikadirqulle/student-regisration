import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import Credential from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { getAdminByEmail } from "./data/user";

export default {
  providers: [
    Credential({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getAdminByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
