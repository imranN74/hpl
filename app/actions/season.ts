import prisma from "@/lib/prisma";

export async function getCurrentSeasonDetails() {
  const currentSeason = await prisma.season.findFirst({
    where: { isActive: true },
    orderBy: {
      seasonNumber: "desc",
    },
  });
  console.log(currentSeason);
  return currentSeason;
}
