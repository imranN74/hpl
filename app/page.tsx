import { Home } from "lucide-react";
import HomePage from "./LandingPage";
import { getCurrentSeasonDetails } from "./actions/season";

export default async function LandingPage() {
  const currentSeason = await getCurrentSeasonDetails();

  // console.log(currentSeason, "...............");

  return <HomePage currentSeason={currentSeason} />;
}
