import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { playerId, resetPrice = true } = body;

    if (!playerId) {
      return NextResponse.json(
        {
          success: false,
          message: "playerId is required",
        },
        { status: 400 }
      );
    }

    await prisma.player.update({
      where: { id: playerId },
      data: {
        team: {
          disconnect: true, // ✅ removes FK
        },
        ...(resetPrice && { price: null }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Player unassigned successfully",
    });
  } catch (error) {
    console.error("unassign player error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to unassign player",
      },
      { status: 500 }
    );
  }
}
