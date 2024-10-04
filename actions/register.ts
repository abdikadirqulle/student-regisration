"use server";
import db from "@/lib/db";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, name, password } = validatedFields.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const userExist = await db.admin.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    return { error: "User already exist!" };
  }
  await db.admin.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });

  await generateVerificationToken(email);
  // await sendVerificationEmail(verficationToken.email, verficationToken.token)

  return { success: "Succeflly to create new user/admin!" };
};
