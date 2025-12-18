import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

/* -------------------- */
/* Validation Schema */
/* -------------------- */
const ownerSchema = z.object({
  ownerName: z.string().min(2),
  ownerEmail: z.string().email(),
  ownerPhone: z.string().optional(),
  ownerPassword: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const data = ownerSchema.parse(body);

    // Check if email already exists
    const existingOwner = await prisma.owner.findUnique({
      where: { ownerEmail: data.ownerEmail },
    });

    if (existingOwner) {
      return NextResponse.json(
        { error: "Owner with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.ownerPassword, 10);

    // Create owner
    const owner = await prisma.owner.create({
      data: {
        ownerName: data.ownerName,
        ownerEmail: data.ownerEmail,
        ownerPhone: data.ownerPhone,
        ownerPassword: hashedPassword,
      },
    });

    // Remove password from response
    const { ownerPassword, ...safeOwner } = owner;

    return NextResponse.json(
      {
        success: true,
        owner: safeOwner,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json(
      { error: "Failed to create owner" },
      { status: 500 }
    );
  }
}
