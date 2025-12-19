"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-linear-to-b from-[#071A2E] via-[#0A1929] to-[#071A2E] text-white overflow-hidden mt-15">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-[#071A2E]" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-5xl">
          <span className="inline-block bg-linear-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold mt-2 md:mt-0 mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
            Season 3 • Now Live
          </span>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-500">
            HURLUNG
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            PREMIER LEAGUE
          </h2>

          <p className="mt-8 text-xl md:text-2xl text-gray-200 leading-relaxed">
            Fast. Fierce. Fearless.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200 font-bold">
              The Ultimate 6-Over Cricket League
            </span>
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/register"
              className="group relative bg-linear-to-r from-yellow-400 to-yellow-500 text-black px-10 py-5 rounded-2xl font-bold overflow-hidden shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Player Registration</span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/teams"
              className="group relative border-2 border-yellow-400 px-10 py-5 rounded-2xl font-bold overflow-hidden hover:border-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                View Teams
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: "🔥", label: "Auction", value: "21 Dec 2025" },
              { icon: "🚀", label: "League Starts", value: "28 Dec 2025" },
              { icon: "⚡", label: "Format", value: "6 Overs" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl mr-2">{item.icon}</span>
                <span className="text-gray-300">{item.label}: </span>
                <b className="text-yellow-400">{item.value}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT HPL */}
      <section
        id="about"
        className="py-32 px-6 bg-linear-to-b from-[#071A2E] to-[#0B2C4D] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200">
              About HPL
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-200 leading-relaxed">
                The{" "}
                <span className="text-yellow-400 font-bold">
                  Hurlung Premier League
                </span>{" "}
                is a high-intensity local cricket tournament designed to
                showcase explosive talent in a fast-paced{" "}
                <span className="text-yellow-400 font-bold">6-over format</span>
                . Now entering its{" "}
                <span className="text-yellow-400 font-bold">3rd season</span>,
                HPL brings unmatched energy, live auctions, and competitive team
                battles.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  { value: "6", label: "Teams", icon: "👥" },
                  { value: "3rd", label: "Season", icon: "🏆" },
                  { value: "T6", label: "Format", icon: "⚡" },
                  { value: "Live", label: "Auction", icon: "💰" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group bg-linear-to-br from-[#071A2E] to-[#0A1929] p-6 rounded-2xl text-center shadow-xl border border-white/5 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/20"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-300 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-[#071A2E] to-[#0A1929] rounded-3xl p-10 shadow-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h3 className="text-3xl font-bold text-yellow-400">
                  What Makes HPL Special?
                </h3>
              </div>
              <ul className="space-y-5 text-gray-200">
                {[
                  { icon: "⚡", text: "Ultra-fast 6-over matches" },
                  { icon: "💰", text: "Auction-based team selection" },
                  { icon: "👥", text: "6 competitive franchise teams" },
                  { icon: "🏆", text: "Recognition for top performers" },
                  { icon: "🛡", text: "Strict discipline & fair play" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section
        id="format"
        className="py-32 px-6 text-center bg-[#071A2E] relative"
      >
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200">
            Tournament Format
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full" />
          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Experience cricket like never before with our revolutionary format
          </p>

          <div className="mt-16 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏏",
                title: "6-Over Matches",
                desc: "Lightning-fast games",
              },
              {
                icon: "👥",
                title: "Complete Squads",
                desc: "Batters, bowlers & all-rounders",
              },
              {
                icon: "💥",
                title: "Power-Hitting Focus",
                desc: "Big shots, big moments",
              },
              {
                icon: "🏆",
                title: "League Intensity",
                desc: "Every match counts",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-linear-to-br from-[#0B2C4D] to-[#071A2E] p-10 rounded-3xl hover:-translate-y-4 transition-all duration-500 border border-white/5 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {item.icon}
                </div>
                <p className="text-xl font-bold text-yellow-400 mb-2">
                  {item.title}
                </p>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUCTION */}
      <section
        id="auction"
        className="py-32 px-6 bg-linear-to-br from-[#0B2C4D] via-[#071A2E] to-[#0B2C4D] text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-block bg-linear-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
            📢 Important Event
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200">
            Auction Day
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full" />

          <p className="mt-8 text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Players will be auctioned live in front of team owners. Every bid
            decides your journey in HPL Season 3. Witness the drama, feel the
            intensity, and secure your spot!
          </p>

          <div className="mt-14 inline-block relative group">
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            <div className="relative bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black px-14 py-8 rounded-3xl font-extrabold text-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300">
              💰 21 December 2025
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[
              { icon: "🎤", text: "Live Commentary" },
              { icon: "📊", text: "Real-time Bidding" },
              { icon: "🎬", text: "Live Streaming" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl mr-2">{item.icon}</span>
                <span className="text-gray-200">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            Ready to Make Your Mark?
          </h2>
          <p className="text-xl md:text-2xl mb-12">
            Register now and be part of the most exciting 6-over league in
            Hurlung.
          </p>

          <Link
            href="/register"
            className="group inline-block relative bg-black text-yellow-400 px-14 py-6 rounded-3xl font-extrabold text-lg overflow-hidden shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Register for HPL 2025</span>
            <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-black translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>

          <p className="mt-6 text-sm opacity-80">
            *Registration subject to approval
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {["Limited Spots", "Close Soon"].map((badge, i) => (
              <span
                key={i}
                className="bg-black/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-yellow-400/5 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200 mb-4">
            HURLUNG
          </div>
          <p className="text-gray-400 mb-6">© 2025 Hurlung Premier League</p>
          <p className="text-yellow-400 text-lg font-semibold mb-8">
            Speed • Skill • Spirit 🏏
          </p>

          <div className="flex justify-center gap-6 text-gray-400">
            {["About", "Teams", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
