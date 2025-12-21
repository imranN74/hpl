"use client";

import { useRef, useState } from "react";
import type { Player } from "@/app/owner/OwnerDashboard";
import { Button } from "./ui/button";
import {
  updatePlayerPhoto,
  updatePlayerPhone,
  updatePlayerRole,
} from "@/app/actions/players";
import toast from "react-hot-toast";

const PLAYER_ROLES = [
  { value: "batsman", label: "Batsman" },
  { value: "bowler", label: "Bowler" },
  { value: "all-rounder", label: "All-Rounder" },
  { value: "wicket-keeper", label: "Wicket-Keeper" },
];

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
  const [uploading, setUploading] = useState(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(player.photoUrl);
  const [currentPhone, setCurrentPhone] = useState(player.phone);
  const [currentRole, setCurrentRole] = useState(player.role);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [phoneInput, setPhoneInput] = useState(player.phone);
  const [roleInput, setRoleInput] = useState(player.role);
  const [updatingPhone, setUpdatingPhone] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("playerId", player.id);

      const result = await updatePlayerPhoto(formData);

      if (result.success) {
        setCurrentPhotoUrl(result.photoUrl!);
        toast.success("Photo updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update photo");
    } finally {
      setUploading(false);
    }
  };

  const handlePhoneUpdate = async () => {
    if (!phoneInput || phoneInput.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setUpdatingPhone(true);

      const result = await updatePlayerPhone({
        playerId: player.id,
        phone: phoneInput,
      });

      if (result.success) {
        setCurrentPhone(phoneInput);
        setIsEditingPhone(false);
        toast.success("Phone number updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update phone number");
    } finally {
      setUpdatingPhone(false);
    }
  };

  const handleRoleUpdate = async () => {
    if (!roleInput) {
      toast.error("Please select a role");
      return;
    }

    try {
      setUpdatingRole(true);

      const result = await updatePlayerRole({
        playerId: player.id,
        role: roleInput,
      });

      if (result.success) {
        setCurrentRole(result.role!);
        setIsEditingRole(false);
        toast.success("Role updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    } finally {
      setUpdatingRole(false);
    }
  };

  const handleCancelPhoneEdit = () => {
    setPhoneInput(currentPhone);
    setIsEditingPhone(false);
  };

  const handleCancelRoleEdit = () => {
    setRoleInput(currentRole);
    setIsEditingRole(false);
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        title="player image"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* FULL SCREEN LOADER */}
      {uploading && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center">
            <div className="relative">
              {/* Spinning ring */}
              <div className="w-24 h-24 border-8 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <p className="text-white text-lg font-semibold mt-6">
              Uploading Image...
            </p>
            <p className="text-cyan-400/80 text-sm mt-2">Please wait</p>
          </div>
        </div>
      )}

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
              <div className="relative">
                <div
                  className={`relative ${
                    !uploading ? "cursor-pointer" : "cursor-not-allowed"
                  } group`}
                  onClick={handleImageClick}
                >
                  <div className="h-32 w-32 rounded-full border-4 border-gradient-to-r from-cyan-400 to-purple-400 overflow-hidden bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                    {currentPhotoUrl ? (
                      <img
                        src={currentPhotoUrl}
                        alt={player.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-bold bg-linear-to-br from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {player.name.charAt(0)}
                      </span>
                    )}

                    {/* Upload overlay */}
                    {!uploading && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-pulse" />
                </div>

                {/* Click to update hint */}
                <p className="text-xs text-center text-cyan-400/60 mt-2">
                  Click to update photo
                </p>

                {/* View Photo Button */}
                {currentPhotoUrl && (
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewOpen(true);
                      }}
                      className="mt-2 text-xs text-purple-400 hover:text-purple-300 underline transition-colors"
                    >
                      View Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold capitalize bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {player.name}
                </h2>

                {/* Role - Edit Mode or Display Mode */}
                {isEditingRole ? (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <select
                      title="role"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      className="bg-white/10 text-white px-3 py-1.5 rounded-lg border border-cyan-500/30 focus:border-cyan-500 focus:outline-none text-sm capitalize"
                    >
                      {PLAYER_ROLES.map((role) => (
                        <option
                          key={role.value}
                          value={role.value}
                          className="bg-slate-800 text-white capitalize"
                        >
                          {role.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleRoleUpdate}
                      disabled={updatingRole}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      {updatingRole ? "..." : "✓"}
                    </button>
                    <button
                      onClick={handleCancelRoleEdit}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <p className="text-sm text-cyan-400/80 font-medium uppercase tracking-wide">
                      {currentRole}
                    </p>
                    <button
                      title="roleEdit"
                      onClick={() => setIsEditingRole(true)}
                      className="text-cyan-400 hover:text-cyan-300 text-xs"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
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

                    {isEditingPhone ? (
                      <div className="flex items-center gap-1 mt-1">
                        <input
                          type="text"
                          maxLength={10}
                          value={phoneInput}
                          onChange={(e) =>
                            setPhoneInput(e.target.value.replace(/\D/g, ""))
                          }
                          className="bg-white/10 text-white px-3 py-1.5 rounded-lg border border-cyan-500/30 focus:border-cyan-500 focus:outline-none text-sm flex-1"
                          placeholder="10-digit number"
                        />
                        <button
                          onClick={handlePhoneUpdate}
                          disabled={updatingPhone}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          {updatingPhone ? "..." : "✓"}
                        </button>
                        <button
                          onClick={handleCancelPhoneEdit}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-base text-white font-semibold">
                          {currentPhone}
                        </p>
                        <button
                          title="phoneEdit"
                          onClick={() => setIsEditingPhone(true)}
                          className="text-cyan-400 hover:text-cyan-300 text-xs"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {!isEditingPhone && (
                    <div className="flex justify-center">
                      <a
                        href={`tel:${currentPhone}`}
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
                      </a>
                    </div>
                  )}
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
              className="absolute -top-3 -right-3 bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200"
            >
              ✕
            </button>

            <img
              src={currentPhotoUrl || "/avtar-placeholder.png"}
              alt={player.name}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
