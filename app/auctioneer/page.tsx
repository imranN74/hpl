import prisma from "@/lib/prisma";
import AuctioneerDashboard from "./AuctionDashboard";

export default async function AuctioneerPage() {
  // 🔹 get current active season
  const season = await prisma.season.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      auctionDate: true,
    },
  });

  const teams = await prisma.team.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  //   console.log(teams, "..........");

  if (!season) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No active season found
      </div>
    );
  }

  return (
    <AuctioneerDashboard
      seasonId={season.id}
      auctionDate={season.auctionDate}
      team={teams}
    />
  );
}
