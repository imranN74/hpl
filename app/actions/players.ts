"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

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

export async function playerRegistration(formData: FormData) {
  try {
    /* ===================== EXTRACT DATA ===================== */
    const name = formData.get("name") as string;
    const fatherName = formData.get("fatherName") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    const age = formData.get("age") as string;
    const address = formData.get("address") as string;
    const panchayat = formData.get("panchayat") as string;
    const seasonId = formData.get("seasonId") as string;

    const battingStyle = (formData.get("battingStyle") as string) || null;
    const bowlingStyle = (formData.get("bowlingStyle") as string) || null;

    const photo = formData.get("photo") as File;

    /* ===================== VALIDATION ===================== */
    if (
      !name ||
      !fatherName ||
      !phone ||
      !role ||
      !age ||
      !address ||
      !panchayat ||
      !seasonId ||
      !photo
    ) {
      return { success: false, message: "All required fields must be filled" };
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber)) {
      return { success: false, message: "Invalid age" };
    }

    /* ===================== DUPLICATE CHECK ===================== */
    const existingPlayer = await prisma.player.findFirst({
      where: {
        phone,
        seasonId,
        isActive: true,
      },
    });

    if (existingPlayer) {
      return {
        success: false,
        message: "Player already registered for this season",
      };
    }

    /* ===================== CLOUDINARY UPLOAD ===================== */
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${photo.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "hpl/players_image",
      resource_type: "image",
    });

    /* ===================== DB SAVE ===================== */
    await prisma.player.create({
      data: {
        name,
        fatherName,
        phone,
        age: ageNumber,
        role,
        battingStyle,
        bowlingStyle,
        panchayat,
        address,
        photoUrl: uploadResult.secure_url,
        season: {
          connect: { id: seasonId },
        },
      },
    });

    return {
      success: true,
      message: "Player registered successfully",
    };
  } catch (error: any) {
    console.error("playerRegistration error:", error);

    return {
      success: false,
      message: "Registration failed",
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
    fatherName: string;
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
  ownerTeamId?: string;
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
          photoUrl: true,
          role: true,
          panchayat: true,
          teamId: true,
          fatherName: true,
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
          fatherName: true,
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
          fatherName: true,
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

//______ASSIGN_TEAM TO PLAYERS_____________

export async function assignPlayerToTeam({
  playerId,
  teamId,
  price,
}: {
  playerId: string;
  teamId: string;
  price: number;
}) {
  try {
    if (!price || price <= 0) {
      return {
        success: false,
        message: "Invalid player price",
      };
    }

    await prisma.player.update({
      where: { id: playerId },
      data: {
        teamId,
        price: Number(price),
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("assignPlayerToTeam error:", error);
    return {
      success: false,
      message: "Failed to assign player",
    };
  }
}

//__PLAYERS FOR AUCTION___

export type AuctionTab = "ALL" | "SOLD" | "UNSOLD";

export async function getPlayersForAuction({
  seasonId,
  tab,
  search,
}: {
  seasonId: string;
  tab: AuctionTab;
  search?: string;
}) {
  try {
    const where: any = {
      seasonId,
      isActive: true,
    };

    /* -------- SEARCH -------- */
    if (search?.trim()) {
      where.OR = [
        {
          name: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          panchayat: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ];
    }

    /* -------- TAB CONDITIONS -------- */
    if (tab === "SOLD") {
      where.teamId = { not: null };
    }

    if (tab === "ALL") {
      where.teamId = null;
    }

    const players = await prisma.player.findMany({
      where,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        photoUrl: true,
        name: true,
        phone: true,
        panchayat: true,
        teamId: true,
        role: true,
        price: true,
        fatherName: true,
      },
    });

    return {
      success: true,
      players,
    };
  } catch (error) {
    console.error("getPlayersForAuction error:", error);
    return {
      success: false,
      message: "Failed to fetch players",
      players: [],
    };
  }
}

//__UPDATE  IMAGE____________

export async function updatePlayerPhoto(formData: FormData) {
  try {
    const photo = formData.get("photo") as File;
    const playerId = formData.get("playerId") as string;

    if (!photo || !playerId) {
      return { success: false, message: "Photo and player ID required" };
    }

    // Upload to Cloudinary
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${photo.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "hpl/players_image",
      resource_type: "image",
    });

    // Update player in database
    await prisma.player.update({
      where: { id: playerId },
      data: {
        photoUrl: uploadResult.secure_url,
      },
    });

    return {
      success: true,
      message: "Photo updated successfully",
      photoUrl: uploadResult.secure_url,
    };
  } catch (error) {
    console.error("updatePlayerPhoto error:", error);
    return {
      success: false,
      message: "Failed to update photo",
    };
  }
}

//______UPDATE PHONE____________

export async function updatePlayerPhone({
  playerId,
  phone,
}: {
  playerId: string;
  phone: string;
}) {
  try {
    if (!playerId || !phone || phone.length !== 10) {
      return { success: false, message: "Invalid phone number" };
    }

    // Check if phone already exists for another player
    const existingPlayer = await prisma.player.findFirst({
      where: {
        phone,
        id: { not: playerId },
      },
    });

    if (existingPlayer) {
      return {
        success: false,
        message: "Phone number already registered to another player",
      };
    }

    await prisma.player.update({
      where: { id: playerId },
      data: { phone },
    });

    return {
      success: true,
      message: "Phone number updated successfully",
    };
  } catch (error) {
    console.error("updatePlayerPhone error:", error);
    return {
      success: false,
      message: "Failed to update phone number",
    };
  }
}

//___UPDATE ROLE____________

export async function updatePlayerRole({
  playerId,
  role,
}: {
  playerId: string;
  role: string;
}) {
  try {
    const validRoles = ["batsman", "bowler", "all-rounder", "wicket-keeper"];

    if (!playerId || !role || !validRoles.includes(role.toLowerCase())) {
      return { success: false, message: "Invalid role selected" };
    }

    await prisma.player.update({
      where: { id: playerId },
      data: { role: role.toLowerCase() },
    });

    return {
      success: true,
      message: "Role updated successfully",
      role: role.toLowerCase(),
    };
  } catch (error) {
    console.error("updatePlayerRole error:", error);
    return {
      success: false,
      message: "Failed to update role",
    };
  }
}

//___SOLD PLAYER UPDATE_________

export async function updateSoldPlayer({
  playerId,
  teamId,
  price,
}: {
  playerId: string;
  teamId: string;
  price: number;
}) {
  try {
    if (!playerId || !teamId || !price || price <= 0) {
      return {
        success: false,
        message: "Invalid input. Please provide valid player, team, and price.",
      };
    }

    const existingPlayer = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!existingPlayer) {
      return {
        success: false,
        message: "Player not found",
      };
    }

    const teamExists = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!teamExists) {
      return {
        success: false,
        message: "Team not found",
      };
    }

    await prisma.player.update({
      where: { id: playerId },
      data: {
        teamId,
        price,
      },
    });

    return {
      success: true,
      message: "Player updated successfully",
    };
  } catch (error) {
    console.error("updateSoldPlayer error:", error);
    return {
      success: false,
      message: "Failed to update player",
    };
  }
}
