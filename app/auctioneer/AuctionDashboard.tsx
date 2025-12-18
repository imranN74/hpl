"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getPlayersForOwner } from "../actions/players";
import { assignPlayerToTeam } from "../actions/players";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

type Player = {
  id: string;
  name: string;
  phone: string;
  teamId?: string | null;
};

type TabType = "ALL" | "UNSOLD";

/* ---------------------------------- */
/* TEMP TEAM LIST (replace IDs later) */
/* ---------------------------------- */

type Team = {
  id: string;
  teamName: string;
  ownerId: string;
  teamImage: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/* ---------------------------------- */
/* Page */
/* ---------------------------------- */

export default function AuctioneerDashboard({
  seasonId,
  auctionDate,
  team,
}: {
  seasonId: string;
  auctionDate: Date;
  team: Team[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>(
    {}
  );
  const [assigning, setAssigning] = useState<string | null>(null);

  const isAuctionOver = new Date() > new Date(auctionDate);

  /* ---------- fetch players ---------- */
  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);

      const res = await getPlayersForOwner({
        seasonId,
        tab: "ALL",
        search,
      });

      if (res.success) {
        setPlayers(res.players);
      }

      setLoading(false);
    }

    fetchPlayers();
  }, [activeTab, search, seasonId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#071A2E] to-[#0b2c4d] p-1 md:p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6 mt-16 md:mt-11">
        {/* HEADER */}
        <div className="px-2">
          <h1 className="text-3xl font-extrabold text-yellow-400">
            Auctioneer Dashboard
          </h1>
          <p className="text-sm text-white/70">
            Assign players to teams during auction
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2 bg-[#071A2E]/70 p-1 rounded-xl">
            <TabButton
              active={activeTab === "ALL"}
              onClick={() => setActiveTab("ALL")}
            >
              All Players
            </TabButton>

            <TabButton
              active={activeTab === "UNSOLD"}
              onClick={() => setActiveTab("UNSOLD")}
              disabled={!isAuctionOver}
            >
              Unsold Players
            </TabButton>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-2.5 text-white/50"
              size={18}
            />
            <Input
              placeholder="Search player..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#071A2E]/70 border-white/10"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#071A2E]/70">
          <table className="min-w-full text-sm">
            <thead className="bg-[#0b2c4d] text-yellow-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Assign Team</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading && players.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-white/60"
                  >
                    No players found
                  </td>
                </tr>
              )}

              {players.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3 font-medium capitalize">{p.name}</td>
                  <td className="px-4 py-3">{p.phone}</td>

                  {/* TEAM SELECT */}
                  <td className="px-4 py-3">
                    <Select
                      value={selectedTeams[p.id] || ""}
                      onValueChange={(value) =>
                        setSelectedTeams((prev) => ({
                          ...prev,
                          [p.id]: value,
                        }))
                      }
                    >
                      <SelectTrigger
                        className="
        w-56
        bg-[#071A2E]
        border-white/20
        text-white
      "
                      >
                        <SelectValue placeholder="Select Team" />
                      </SelectTrigger>

                      <SelectContent className="bg-[#071A2E] border-white/20 text-white capitalize">
                        {team.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.teamName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* ASSIGN */}
                  <td className="px-4 py-3 text-center">
                    <Button
                      size="sm"
                      disabled={!selectedTeams[p.id] || assigning === p.id}
                      onClick={async () => {
                        setAssigning(p.id);

                        const res = await assignPlayerToTeam({
                          playerId: p.id,
                          teamId: selectedTeams[p.id],
                        });

                        setAssigning(null);

                        if (res.success) {
                          setPlayers((prev) =>
                            prev.filter((pl) => pl.id !== p.id)
                          );
                        } else {
                          alert(res.message);
                        }
                      }}
                    >
                      {assigning === p.id ? "Assigning..." : "Assign"}
                    </Button>
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-white/50"
                  >
                    Loading players...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function TabButton({
  active,
  children,
  onClick,
  disabled,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="ghost"
      className={`px-4 py-2 font-semibold ${
        active ? "bg-yellow-400 text-black" : "text-white"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </Button>
  );
}
