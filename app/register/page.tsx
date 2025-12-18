import PlayerRegistrationPage from "./RegistrationForm";
import prisma from "@/lib/prisma";

export default async function Registration() {
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
