"use server";

import prisma from "@/lib/prisma";

export interface PlayerInput {
  name: string;
  fatherName: string;
  phone: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  age: string;
  address: string;
  panchayat: string;
  seasonId: string;
}

export async function playerRegistration(data: PlayerInput) {
  try {
    console.log(data);

    if (
      !data.name ||
      !data.fatherName ||
      !data.phone ||
      !data.role ||
      !data.age ||
      !data.address ||
      !data.panchayat ||
      !data.seasonId
    ) {
      throw new Error("All required fields must be filled");
    }

    // check duplicate player in same season
    const existingPlayer = await prisma.player.findFirst({
      where: {
        phone: data.phone,
        seasonId: data.seasonId,
        isActive: true,
      },
    });

    if (existingPlayer) {
      throw new Error("Player already registered for this season");
    }

    const player = await prisma.player.create({
      data: {
        name: data.name,
        fatherName: data.fatherName,
        phone: data.phone,
        age: Number(data.age),
        role: data.role,
        battingStyle: data.battingStyle || null,
        bowlingStyle: data.bowlingStyle || null,
        panchayat: data.panchayat,
        address: data.address,
        seasonId: data.seasonId,
      },
    });

    return {
      success: true,
      message: "Player registered successfully",
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

//______PLAYER LIST_____
export type PlayerTab = "ALL" | "UNSOLD" | "YOUR";

export type GetPlayersResponse = {
  success: boolean;
  message?: string;
  players: {
    id: string;
    name: string;
    phone: string;
    role: string;
    panchayat: string;
    teamId?: string | null;
  }[];
  isAuctionOver: boolean;
  noPlayersBought?: boolean;
};

export async function getPlayersForOwner({
  seasonId,
  tab,
  ownerTeamId,
  search,
}: {
  seasonId: string;
  tab: PlayerTab;
  ownerTeamId: string;
  search?: string;
}): Promise<GetPlayersResponse> {
  try {
    /* ================= SEASON ================= */
    const season = await prisma.season.findUnique({
      where: { id: seasonId },
      select: {
        auctionDate: true,
      },
    });

    if (!season) {
      return {
        success: false,
        message: "Season not found",
        players: [],
        isAuctionOver: false,
      };
    }

    /* ================= AUCTION STATUS ================= */
    const isAuctionOver = new Date() > season.auctionDate;

    /* ================= BASE FILTER ================= */
    const baseWhere: any = {
      seasonId,
      isActive: true,
    };

    // 🔍 Optional search (SERVER SIDE)
    if (search?.trim()) {
      baseWhere.name = {
        contains: search.trim(),
        mode: "insensitive",
      };
    }

    /* ================= ALL PLAYERS ================= */
    if (tab === "ALL") {
      const players = await prisma.player.findMany({
        where: baseWhere,
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          phone: true,
          role: true,
          panchayat: true,
          teamId: true,
        },
      });

      return {
        success: true,
        players,
        isAuctionOver,
      };
    }

    /* ================= UNSOLD PLAYERS ================= */
    if (tab === "UNSOLD") {
      // ❗ Auction still running → UNSOLD hidden
      if (!isAuctionOver) {
        return {
          success: true,
          players: [],
          isAuctionOver: false,
        };
      }

      const players = await prisma.player.findMany({
        where: {
          ...baseWhere,
          teamId: null, // ✅ UNSOLD
        },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          phone: true,
          role: true,
          panchayat: true,
          teamId: true,
        },
      });

      return {
        success: true,
        players,
        isAuctionOver: true,
      };
    }

    /* ================= YOUR PLAYERS ================= */
    if (tab === "YOUR") {
      const players = await prisma.player.findMany({
        where: {
          ...baseWhere,
          teamId: ownerTeamId, // ✅ SOLD TO THIS OWNER (JWT-verified)
        },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          phone: true,
          role: true,
          panchayat: true,
          teamId: true,
        },
      });

      return {
        success: true,
        players,
        isAuctionOver,
        noPlayersBought: players.length === 0,
      };
    }

    return {
      success: false,
      message: "Invalid tab",
      players: [],
      isAuctionOver,
    };
  } catch (error) {
    console.error("getPlayersForOwner error:", error);
    return {
      success: false,
      message: "Something went wrong",
      players: [],
      isAuctionOver: false,
    };
  }
}
