"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  LogIn,
  LogOut,
  House,
  SquareUser,
  PencilLine,
  Users,
} from "lucide-react";
import { logoutAction } from "@/app/actions/login";

export default function Navbar(account: { account: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);

  // console.log(account, "acccccc.....");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#071A2E]/90 backdrop-blur border-b border-white/10 text-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wide text-yellow-400"
        >
          HPL
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 font-medium cursor-pointer">
          {!account?.account?.isLoggedIn ? (
            ""
          ) : (
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                Hey,&nbsp;
                <span className="capitalize text-yellow-400 font-bold">
                  {account?.account?.owner?.ownerName.split(" ")[0]}
                </span>
              </Link>
            </li>
          )}

          <li>
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/register"
              className="text-green-500 font-bold hover:text-yellow-400 transition"
            >
              Register Now🔥
            </Link>
          </li>

          <li>
            <Link href="/rules" className="hover:text-yellow-400 transition">
              Rules
            </Link>
          </li>

          <li>
            <Link href="/teams" className="hover:text-yellow-400 transition">
              Teams
            </Link>
          </li>

          {!account?.account?.isLoggedIn ? (
            ""
          ) : (
            <li>
              <Link href="/owner" className="block hover:text-yellow-400">
                Players List
              </Link>
            </li>
          )}

          {/* SEASONS DROPDOWN */}
          {/* <li className="relative">
            <button
              onClick={() => setSeasonOpen(!seasonOpen)}
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              Seasons <ChevronDown size={16} />
            </button>

            {seasonOpen && (
              <div className="absolute top-8 left-0 bg-[#0B2C4D] rounded-xl shadow-lg w-44 overflow-hidden">
                <Link
                  href="/seasons/season-1"
                  className="block px-4 py-3 hover:bg-yellow-400 hover:text-black transition"
                  onClick={() => setSeasonOpen(false)}
                >
                  Season 1
                </Link>
                <Link
                  href="/seasons/season-2"
                  className="block px-4 py-3 hover:bg-yellow-400 hover:text-black transition"
                  onClick={() => setSeasonOpen(false)}
                >
                  Season 2
                </Link>
              </div>
            )}
          </li> */}
          <li className=" hover:text-yellow-400">
            {!account?.account?.isLoggedIn ? (
              <Link
                href="/login"
                className="hover:text-yellow-400 flex justify-center items-center gap-1"
              >
                <LogIn color="#c7d22d" size={20} />
                Login
              </Link>
            ) : (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="hover:text-red-400 transition cursor-pointer flex justify-center items-center gap-1"
                >
                  Logout
                  <LogOut color="#c7d22d" size={20} />
                </button>
              </form>
            )}
          </li>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-[#071A2E] border-t border-white/10">
          <ul className="flex flex-col px-6 py-4 gap-4 font-medium">
            {!account?.account?.isLoggedIn ? (
              ""
            ) : (
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-yellow-400 transition"
                >
                  Welcome,&nbsp;
                  <span className="capitalize text-yellow-400 font-bold">
                    {account?.account?.owner?.ownerName.split(" ")[0]}
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block hover:text-yellow-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block text-green-500 font-bold hover:text-yellow-400"
              >
                Register Now🔥
              </Link>
            </li>

            <li>
              <Link
                href="/rules"
                onClick={() => setMobileOpen(false)}
                className="block hover:text-yellow-400"
              >
                Rules
              </Link>
            </li>
            <li>
              <Link
                href="/teams"
                onClick={() => setMobileOpen(false)}
                className="block hover:text-yellow-400"
              >
                Teams
              </Link>
            </li>

            {!account?.account?.isLoggedIn ? (
              ""
            ) : (
              <li>
                <Link
                  href="/owner"
                  onClick={() => setMobileOpen(false)}
                  className="block hover:text-yellow-400"
                >
                  Players List
                </Link>
              </li>
            )}

            {/* MOBILE SEASONS */}
            {/* <li>
              <button
                onClick={() => setSeasonOpen(!seasonOpen)}
                className="flex items-center justify-between w-full hover:text-yellow-400"
              >
                Seasons
                <ChevronDown size={16} />
              </button>

              {seasonOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link
                    href="/seasons/season-1"
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-yellow-400"
                  >
                    Season 1
                  </Link>
                  <Link
                    href="/seasons/season-2"
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-yellow-400"
                  >
                    Season 2
                  </Link>
                </div>
              )}
            </li> */}
            <li className=" hover:text-yellow-400">
              {!account?.account?.isLoggedIn ? (
                <Link
                  href="/login"
                  className="hover:text-yellow-400 flex justify-center items-center gap-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn color="#c7d22d" size={20} />
                  Login
                </Link>
              ) : (
                <form action={logoutAction}>
                  <button
                    type="submit"
                    // onClick={() => setMobileOpen(false)}
                    className="hover:text-red-400 transition cursor-pointer flex justify-center items-center gap-1"
                  >
                    Logout
                    <LogOut color="#c7d22d" size={20} />
                  </button>
                </form>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
