"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

type Team = {
  id: string;
  teamName: string;
  teamImage?: string | null;
  owner: {
    id: string;
    name: string;
  };
};

export default function TeamsClient({ teams }: { teams: Team[] }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 px-6 py-18">
      {/* Title with animated linear */}
      <h1 className="text-center text-5xl md:text-6xl font-bold tracking-tight mb-16 bg-linear-to-r from-slate-100 via-cyan-200 to-indigo-300 bg-clip-text text-transparent animate-linear">
        HPL Teams
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {teams.map((team, index) => (
          <Card
            key={team.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-700 hover:border-cyan-500/50 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Shine effect overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shine" />
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Poster Area */}
            <div className="relative h-72 w-full overflow-hidden bg-linear-to-br from-slate-800 via-slate-700 to-slate-800">
              {/* Background glow */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <Image
                src={team.teamImage || "/placeholder-team.png"}
                alt={team.teamName}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* linear Divider */}
            <div className="h-0.5 bg-linear-to-r from-transparent via-slate-600 to-transparent group-hover:via-cyan-500 transition-colors duration-500" />

            {/* Content */}
            <div className="p-6 text-center space-y-3">
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide group-hover:text-cyan-200 transition-colors duration-500 uppercase">
                {team.teamName}
              </h2>

              {/* Owner badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600 group-hover:bg-slate-700 group-hover:border-cyan-500/50 transition-all duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-sm text-slate-300 group-hover:text-cyan-200 transition-colors duration-500 capitalize">
                  <span className="font-semibold">{team.owner.name}</span>
                </p>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-cyan-500 to-indigo-500 group-hover:w-full transition-all duration-700 ease-out" />

            {/* Soft Hover Glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-t from-cyan-500/10 via-transparent to-transparent" />
          </Card>
        ))}
      </div>
    </div>
  );
}
