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
    <button
      onClick={handleLogout}
      className="hover:text-red-400 transition cursor-pointer flex items-center gap-1"
    >
      Logout
      <LogOut color="#c7d22d" size={20} />
    </button>
  );
}
