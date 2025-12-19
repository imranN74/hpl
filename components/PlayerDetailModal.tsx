"use client";

import { useState } from "react";
import type { Player } from "@/app/owner/OwnerDashboard";
import { Button } from "./ui/button";
import { success } from "zod";

export function PlayerDetailsModal({
  player,
  auctionDate,
  onClose,
}: {
  player: Player;
  onClose: () => void;
  auctionDate: Date;
}) {
  const isAuctionOver = new Date() > new Date(auctionDate);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="w-full max-w-lg rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 hover:rotate-90"
          >
            ✕
          </button>

          <div className="relative p-6">
            {/* AVATAR */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b border-white/10">
              <div
                className="relative cursor-pointer"
                onClick={() => player.photoUrl && setPreviewOpen(true)}
              >
                <div className="h-32 w-32 rounded-full border-4 border-gradient-to-r from-cyan-400 to-purple-400 overflow-hidden bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:scale-105">
                  {player.photoUrl ? (
                    <img
                      src={player.photoUrl}
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl font-bold bg-linear-to-br from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {player.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-pulse" />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold capitalize bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {player.name}
                </h2>
                <p className="text-sm text-cyan-400/80 font-medium mt-1 uppercase tracking-wide">
                  {player.role}
                </p>
              </div>

              {isAuctionOver && (
                <span className="border px-3 py-1 rounded-xl bg-yellow-600 text-sm font-semibold">
                  {player.teamId ? "Sold" : "Unsold"}
                </span>
              )}
            </div>

            {/* DETAILS */}
            <div className="mt-6 space-y-4">
              {/* Contact Information */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:bg-white/10 group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/50 uppercase tracking-wider font-medium">
                      Phone Number
                    </p>
                    <p className="text-base text-white font-semibold mt-0.5">
                      {player.phone}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="
      relative
      px-6 py-3
      rounded-xl
      font-semibold
      text-white
      bg-linear-to-r from-green-500 to-emerald-500
      shadow-lg shadow-green-500/40
      transition-all duration-300
      hover:scale-105
      hover:shadow-green-500/70
      focus:outline-none
    "
                    >
                      📞 Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10 group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/50 uppercase tracking-wider font-medium">
                      Panchayat
                    </p>
                    <p className="text-base text-white font-semibold mt-0.5 capitalize">
                      {player.panchayat}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <div className="mt-6 text-center">
              <Button
                onClick={onClose}
                className="w-full bg-linear-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 font-semibold py-6 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-3 -right-3 bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center"
            >
              ✕
            </button>

            <img
              src={player.photoUrl || "/avtar-placeholder.png"}
              alt={player.name}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
