import TeamsClient from "./Team";
import { fetchAllTeams } from "../actions/team";

export default async function TeamsPage() {
  const { success, data } = await fetchAllTeams();

  if (!success || !data) {
    return <div>Failed to load teams</div>;
  }

  // console.log("dattttttt", data);

  const teams = data.map((team) => ({
    id: team.id,
    teamName: team.teamName,
    teamImage: team?.teamImage,
    owner: {
      id: team.owner.id,
      name: team.owner.ownerName,
    },
  }));

  return <TeamsClient teams={teams} />;
}
