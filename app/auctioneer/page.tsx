import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AuctioneerDashboard from "./AuctionDashboard";
import { getCurrentAccount } from "@/lib/auth";

export default async function AuctioneerPage() {
  // 🔐 AUTH GUARD (same everywhere)
  const account = await getCurrentAccount();

  if (
    !account?.isLoggedIn ||
    account.accountType !== "USER" ||
    account.user?.role !== "AUCTIONEER"
  ) {
    redirect("/login"); // or "/unauthorized"
  }

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
      // auctionDate={season.auctionDate}
      team={teams}
    />
  );
}
