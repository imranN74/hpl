"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getPlayersForOwner } from "../actions/players";

type Player = {
  id: string;
  name: string;
  phone: string;
  role: string;
  panchayat: string;
  teamId?: string | null;
};

type TabType = "ALL" | "UNSOLD" | "YOUR";

export default function OwnerDashboardClient({
  seasonId,
  ownerTeamId,
  auctionDate,
}: {
  seasonId: string;
  ownerTeamId: string;
  auctionDate: Date;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuctionOver, setIsAuctionOver] = useState(false);
  const [noPlayersBought, setNoPlayersBought] = useState(false);

  /* ---------- auction status ---------- */
  useEffect(() => {
    setIsAuctionOver(new Date() > new Date(auctionDate));
  }, [auctionDate]);

  /* ---------- fetch players ---------- */
  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      setPlayers([]); // ✅ IMPORTANT: clear old data on tab change
      setNoPlayersBought(false);

      const res = await getPlayersForOwner({
        seasonId,
        tab: activeTab,
        ownerTeamId,
        search, // ✅ server-side search
      });

      if (res.success) {
        setPlayers(res.players);
        setNoPlayersBought(Boolean(res.noPlayersBought));
      }

      setLoading(false);
    }

    fetchPlayers();
  }, [activeTab, search, seasonId, ownerTeamId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#071A2E] to-[#0b2c4d] p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-extrabold text-yellow-400">
            Owner Dashboard
          </h1>
          <p className="text-sm text-white/70">
            Player auction & team management
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

            <TabButton
              active={activeTab === "YOUR"}
              onClick={() => setActiveTab("YOUR")}
            >
              Your Players
            </TabButton>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-2.5 text-white/50"
              size={18}
            />
            <Input
              placeholder="Search by player name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#071A2E]/70 border-white/10"
            />
          </div>
        </div>

        {/* INFO STATES */}
        {activeTab === "UNSOLD" && !isAuctionOver && (
          <Info text="Auction is still ongoing. Unsold players will appear after auction ends." />
        )}

        {activeTab === "YOUR" && noPlayersBought && !loading && (
          <Info text="No player bought yet." />
        )}

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#071A2E]/70">
          <table className="min-w-full text-sm">
            <thead className="bg-[#0b2c4d] text-yellow-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Panchayat</th>
                <th className="px-4 py-3 text-center">Info</th>
              </tr>
            </thead>

            <tbody>
              {!loading && players.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
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
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.phone}</td>
                  <td className="px-4 py-3">{p.role}</td>
                  <td className="px-4 py-3">{p.panchayat}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="rounded-full bg-yellow-400 px-3 py-1 text-black font-bold">
                      ⓘ
                    </button>
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td
                    colSpan={5}
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

/* ---------- helpers ---------- */
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

function Info({ text }: { text: string }) {
  return (
    <div className="rounded-lg bg-yellow-400/10 border border-yellow-400/30 px-4 py-3 text-yellow-300 text-sm">
      {text}
    </div>
  );
}
