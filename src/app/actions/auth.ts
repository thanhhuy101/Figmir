"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { signUpSchema } from "~/schemas";
import { signIn, signOut } from "~/server/auth";
import { db } from "~/server/db";

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { email, password } = await signUpSchema.parseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return "User already exists";
    }

    const hash = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hash,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((error) => error.message).join(",");
    }
  }

  redirect("/signin");
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return "Invalid credentials";
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return "Invalid credentials";
    }

    // Instead of using signIn directly, we'll create a session
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}
export async function signout() {
  await signOut();
}
