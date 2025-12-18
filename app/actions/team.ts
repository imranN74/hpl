"use server";

import prisma from "@/lib/prisma";

export async function fetchAllTeams() {
  try {
    const teams = await prisma.team.findMany({
      where: {
        isActive: true, // optional filter
      },
      include: {
        owner: {
          select: {
            id: true,
            ownerName: true, // adjust if owner field name is different
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      success: true,
      data: teams,
    };
  } catch (error) {
    console.error("Fetch teams error:", error);
    return {
      success: false,
      message: "Failed to fetch teams",
    };
  }
}
