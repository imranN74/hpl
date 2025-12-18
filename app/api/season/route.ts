import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

/* -------------------- */
/* Validation Schema */
/* -------------------- */
const seasonSchema = z.object({
  seasonName: z.string().optional(),
  year: z.string().min(4),
  seasonNumber: z.number().int().positive(),

  // values like "2025-12-21"
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  auctionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

/* -------------------- */
/* POST: Create Season */
/* -------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = seasonSchema.parse(body);

    // Convert "YYYY-MM-DD" → Date
    const startDate = new Date(`${data.startDate}T00:00:00.000Z`);
    const endDate = new Date(`${data.endDate}T00:00:00.000Z`);
    const auctionDate = new Date(`${data.auctionDate}T00:00:00.000Z`);

    // Date validations
    if (endDate <= startDate) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    if (auctionDate < startDate || auctionDate > endDate) {
      return NextResponse.json(
        { error: "Auction date must be between start and end date" },
        { status: 400 }
      );
    }

    // Prevent duplicate season (year + seasonNumber)
    const existingSeason = await prisma.season.findFirst({
      where: {
        year: data.year,
        seasonNumber: data.seasonNumber,
      },
    });

    if (existingSeason) {
      return NextResponse.json(
        { error: "Season already exists for this year and season number" },
        { status: 409 }
      );
    }

    // Create season
    const season = await prisma.season.create({
      data: {
        seasonName: data.seasonName,
        year: data.year,
        seasonNumber: data.seasonNumber,
        startDate,
        endDate,
        auctionDate,
      },
    });

    return NextResponse.json(
      {
        success: true,
        season,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json(
      { error: "Failed to create season" },
      { status: 500 }
    );
  }
}

//______GET CURRENT SEASON
export async function GET(req: Request) {
  try {
    const now = new Date();

    const currentSeason = await prisma.season.findFirst({
      where: {
        isActive: true,
        endDate: {
          gte: now, // endDate >= today
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!currentSeason) {
      return NextResponse.json(
        { message: "No active season available" },
        { status: 404 }
      );
    }

    return NextResponse.json(currentSeason, { status: 200 });
  } catch (error) {
    console.error("GET CURRENT SEASON ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
