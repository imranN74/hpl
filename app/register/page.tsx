import { redirect } from "next/navigation";
import PlayerRegistrationPage from "./RegistrationForm";
import prisma from "@/lib/prisma";
import { getCurrentAccount } from "@/lib/auth";

export default async function Registration() {
  // 🔐 AUTH GUARD
  const account = await getCurrentAccount();

  if (
    !account?.isLoggedIn ||
    account.accountType !== "USER" ||
    account.user?.role !== "AUCTIONEER"
  ) {
    redirect("/login"); // or "/unauthorized"
  }

  // ⏳ SEASON LOGIC
  const now = new Date();

  const season = await prisma.season.findFirst({
    where: {
      isActive: true,
      endDate: { gte: now },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!season) {
    return <p className="text-sm text-red-500">No active season available</p>;
  }

  return <PlayerRegistrationPage seasonData={season} />;
}
