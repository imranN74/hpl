"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getPlayersForAuction, assignPlayerToTeam } from "../actions/players";
import { PlayerDetailsModal } from "../../components/PlayerDetailModal";
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
  role: string;
  panchayat: string;
  photoUrl?: string | null;
  teamId?: string | null;
  price?: number | null;
};

type TabType = "ALL" | "SOLD";

type Team = {
  id: string;
  teamName: string;
};

/* ---------------------------------- */
/* Page */
/* ---------------------------------- */

export default function AuctioneerDashboard({
  seasonId,
  team,
}: {
  seasonId: string;
  team: Team[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>(
    {}
  );
  const [playerPrices, setPlayerPrices] = useState<Record<string, number>>({});
  const [assigning, setAssigning] = useState<string | null>(null);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  /* ---------- FETCH PLAYERS ---------- */
  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);

      const res = await getPlayersForAuction({
        seasonId,
        tab: activeTab, // ALL = UNSOLD, SOLD = SOLD
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
    <>
      <div className="min-h-screen bg-linear-to-br from-[#071A2E] to-[#0b2c4d] p-4 text-white">
        <div className="max-w-7xl mx-auto space-y-6 mt-16">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-400">
              Auctioneer Dashboard
            </h1>
            <p className="text-sm text-white/70">
              Assign teams and record sold price
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 bg-[#071A2E]/70 p-1 rounded-xl">
              <TabButton
                active={activeTab === "ALL"}
                onClick={() => setActiveTab("ALL")}
              >
                Unsold Players
              </TabButton>

              <TabButton
                active={activeTab === "SOLD"}
                onClick={() => setActiveTab("SOLD")}
              >
                Sold Players
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
                  <th className="px-3 py-3">#</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Phone</th>

                  {activeTab === "ALL" && (
                    <>
                      <th className="px-3 py-3">Price (₹)</th>
                      <th className="px-3 py-3">Team</th>
                      <th className="px-3 py-3">Action</th>
                    </>
                  )}

                  {activeTab === "SOLD" && (
                    <>
                      <th className="px-3 py-3">Price</th>
                      <th className="px-3 py-3">Status</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody>
                {!loading && players.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-white/60"
                    >
                      No players found
                    </td>
                  </tr>
                )}

                {players.map((p, index) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPlayer(p)}
                    className="border-t border-white/10 hover:bg-white/5 cursor-pointer"
                  >
                    <td className="px-3 py-3">{index + 1}</td>
                    <td className="px-3 py-3 capitalize">{p.name}</td>
                    <td className="px-3 py-3">{p.phone}</td>

                    {/* UNSOLD */}
                    {activeTab === "ALL" && (
                      <>
                        <td className="px-3 py-3">
                          <Input
                            onClick={(e) => e.stopPropagation()}
                            type="number"
                            min={1}
                            placeholder="Amount"
                            className="w-28 bg-[#071A2E] border-white/20"
                            value={playerPrices[p.id] || ""}
                            onChange={(e) =>
                              setPlayerPrices((prev) => ({
                                ...prev,
                                [p.id]: Number(e.target.value),
                              }))
                            }
                          />
                        </td>

                        <td className="px-3 py-3">
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
                              onClick={(e) => e.stopPropagation()}
                              className="w-48 bg-[#071A2E] border-white/20"
                            >
                              <SelectValue placeholder="Select Team" />
                            </SelectTrigger>

                            <SelectContent className="bg-[#071A2E] border-white/20 text-white">
                              {team.map((t) => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.teamName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>

                        <td className="px-3 py-3">
                          <Button
                            size="sm"
                            onClick={async (e) => {
                              e.stopPropagation();
                              setAssigning(p.id);

                              const res = await assignPlayerToTeam({
                                playerId: p.id,
                                teamId: selectedTeams[p.id],
                                price: playerPrices[p.id],
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
                            disabled={
                              !selectedTeams[p.id] ||
                              !playerPrices[p.id] ||
                              assigning === p.id
                            }
                          >
                            {assigning === p.id ? "Assigning..." : "Assign"}
                          </Button>
                        </td>
                      </>
                    )}

                    {/* SOLD */}
                    {activeTab === "SOLD" && (
                      <>
                        <td className="px-3 py-3 text-yellow-400 font-semibold">
                          ₹{p.price ?? "-"}
                        </td>
                        <td className="px-3 py-3 text-green-400 font-semibold">
                          SOLD
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {loading && (
              <div className="p-6 text-center text-white/50">
                Loading players...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PLAYER DETAILS MODAL */}
      {selectedPlayer && (
        <PlayerDetailsModal
          player={selectedPlayer}
          auctionDate={new Date()}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </>
  );
}

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`px-4 py-2 font-semibold ${
        active ? "bg-yellow-400 text-black" : "text-white"
      }`}
    >
      {children}
    </Button>
  );
}
