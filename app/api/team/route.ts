import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const teamSchema = z.object({
  teamName: z.string().min(2),
  ownerId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = teamSchema.parse(body);

    // Check if owner exists
    const owner = await prisma.owner.findUnique({
      where: { id: data.ownerId },
    });

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }

    // (Optional but recommended) prevent duplicate team name for same owner
    const existingTeam = await prisma.team.findFirst({
      where: {
        teamName: data.teamName,
        ownerId: data.ownerId,
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: "Team with this name already exists for this owner" },
        { status: 409 }
      );
    }

    // Create team
    const team = await prisma.team.create({
      data: {
        teamName: data.teamName,
        ownerId: data.ownerId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        team,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
