"use server";

import { cookies } from "next/headers";
import { registerSchema, loginSchema } from "@/schemas/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/auth";

export async function register(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = registerSchema.safeParse(data);

    if (!validatedFields.success) {
      return { 
        error: "Invalid fields: " + validatedFields.error.errors.map(e => e.message).join(", "),
        success: false
      };
    }

    const { email, password, name } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists", success: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = signJWT(user.id);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return { success: true };
  } catch (error) {
    console.error("Register Error:", error);
    return { error: "Internal server error", success: false };
  }
}

export async function login(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = loginSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid fields", success: false };
    }

    const { email, password } = validatedFields.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "Invalid email or password", success: false };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid email or password", success: false };
    }

    const token = signJWT(user.id);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Internal server error", success: false };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { maxAge: 0 });
}
