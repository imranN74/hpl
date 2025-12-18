"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { signJwt } from "@/lib/jwt";
import { redirect } from "next/navigation";

export type LoginResponse = {
  success: boolean;
  message: string;
  accountType?: "USER" | "OWNER";
  user?: {
    id: string;
    name: string;
    role: string;
  };
};

export async function loginAction(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    if (!data.email || !data.password) {
      return { success: false, message: "Email and password required" };
    }

    const cookieStore = await cookies();

    /* ================= USER ================= */
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && user.isActive) {
      const valid = await bcrypt.compare(data.password, user.password);
      if (!valid) {
        return { success: false, message: "Invalid credentials" };
      }

      const token = signJwt({
        id: user.id,
        email: user.email,
        accountType: "USER",
        role: user.role,
      });

      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return {
        success: true,
        message: "Welcome to HPL!",
        accountType: "USER",
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      };
    }

    /* ================= OWNER ================= */
    const owner = await prisma.owner.findUnique({
      where: { ownerEmail: data.email },
      include: {
        team: {
          where: { isActive: true },
          select: { id: true },
        },
      },
    });

    if (owner && owner.isActive) {
      const valid = await bcrypt.compare(data.password, owner.ownerPassword);

      if (!valid) {
        return { success: false, message: "Invalid credentials" };
      }

      // 🔴 Important check
      if (!owner.team.length) {
        return {
          success: false,
          message: "No active team found for this owner",
        };
      }

      const teamId = owner.team[0].id; // assuming 1 active team

      const token = signJwt({
        id: owner.id,
        email: owner.ownerEmail,
        accountType: "OWNER",
        teamId,
      });

      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return {
        success: true,
        message: "Welcome to HPL!",
        accountType: "OWNER",
      };
    }

    return { success: false, message: "Invalid credentials" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong" };
  }
}

//LOGOUT

export async function logoutAction() {
  // Next.js 15+ → cookies() is async
  const cookieStore = await cookies();

  // Remove JWT cookie
  cookieStore.delete("auth_token");

  // Optional: redirect after logout
  redirect("/login");
}
