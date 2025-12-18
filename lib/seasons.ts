import prisma from "@/lib/prisma";

export async function getCurrentSeason() {
  return prisma.season.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      auctionDate: true,
    },
  });
}
