"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/login";

export default function LogoutButton({
  setMobileOpen,
}: {
  setMobileOpen: (v: boolean) => void;
}) {
  const handleLogout = async () => {
    setMobileOpen(false);
    await logoutAction();
  };

  return (
    <div className="hover:text-yellow-400 flex justify-center items-center gap-1 bg-yellow-700 p-2 rounded-md">
      <button
        onClick={handleLogout}
        className="hover:text-red-400 transition cursor-pointer flex items-center gap-1"
      >
        Logout
        <LogOut color="#c7d22d" size={20} />
      </button>
    </div>
  );
}
