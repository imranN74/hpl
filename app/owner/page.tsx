import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/auth";
import OwnerDashboardClient from "./OwnerDashboard";
import { getCurrentSeason } from "@/lib/seasons";

export default async function OwnerDashboardPage() {
  const account = await getCurrentAccount();

  if (!account.isLoggedIn || account.accountType !== "OWNER") {
    redirect("/login");
  }

  const season = await getCurrentSeason();

  if (!season) {
    throw new Error("No active season found");
  }

  return (
    <OwnerDashboardClient
      seasonId={season.id}
      auctionDate={season.auctionDate}
      ownerTeamId={account.owner.teamId}
    />
  );
}
