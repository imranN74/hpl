import { ShieldCheck, Gavel, Users, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Rules & Regulations | Hurlung Premier League",
  description:
    "Official rules and regulations of Hurlung Premier League (Tennis Cricket)",
};

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-10 mt-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            🏏 Hurlung Premier League
          </h1>
          <p className="text-lg text-slate-300 mt-2">
            Rules & Regulations (Tennis Cricket)
          </p>
        </header>

        {/* Rules Sections */}
        <div className="space-y-8">
          {/* General Rules */}
          <Section
            icon={<ShieldCheck className="w-6 h-6 text-cyan-400" />}
            title="General Rules"
          >
            <ul className="list-disc pl-6 space-y-2">
              <li>All matches are played under tennis cricket rules.</li>
              <li>Only registered players are allowed to participate.</li>
              <li>Match schedules are decided by the HPL Management.</li>
              <li>Players must carry valid ID proof.</li>
            </ul>
          </Section>

          {/* Injury Policy */}
          <Section
            icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
            title="Player Injury & Responsibility"
          >
            <ul className="list-disc pl-6 space-y-2">
              <li>Players participate at their own risk.</li>
              <li>
                Any injury during matches or practice is the player’s own
                responsibility.
              </li>
              <li>
                Organizers, umpires, and sponsors are not responsible for any
                injury or loss.
              </li>
              <li>Players should ensure they are medically fit.</li>
            </ul>
          </Section>

          {/* Umpire Decision */}
          <Section
            icon={<Gavel className="w-6 h-6 text-yellow-400" />}
            title="Umpire & Match Officials"
          >
            <ul className="list-disc pl-6 space-y-2">
              <li>Umpire’s decision is final and binding.</li>
              <li>No arguments or misbehavior with umpires is allowed.</li>
              <li>
                Misconduct may result in penalty, suspension, or
                disqualification.
              </li>
            </ul>
          </Section>

          {/* Cricket Rules */}
          <Section
            icon={<Users className="w-6 h-6 text-green-400" />}
            title="Tennis Cricket Rules"
          >
            <ul className="list-disc pl-6 space-y-2">
              <li>LBW (Leg Before Wicket) is NOT applicable.</li>
              <li>All standard tennis cricket rules will be followed.</li>
              <li>Runs can be scored by running or boundaries.</li>
              <li>
                Wide ball, no-ball, and other decisions are as per umpire.
              </li>
            </ul>
          </Section>

          {/* Discipline */}
          <Section title="Discipline & Conduct">
            <ul className="list-disc pl-6 space-y-2">
              <li>Players must maintain sportsmanship at all times.</li>
              <li>Abusive language or fighting is strictly prohibited.</li>
              <li>The management can take strict disciplinary action.</li>
            </ul>
          </Section>

          {/* Authority */}
          <Section title="Tournament Authority">
            <ul className="list-disc pl-6 space-y-2">
              <li>HPL Management reserves the right to modify rules.</li>
              <li>Matches can be rescheduled or canceled if required.</li>
              <li>All decisions by the management are final.</li>
            </ul>
          </Section>

          {/* Acceptance */}
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-6 text-center">
            <p className="text-slate-300">
              By registering and participating in the tournament, all players
              and teams agree to abide by the above rules and regulations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------- */
/* Reusable Section Component */
/* ---------------------------------- */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="text-slate-300 text-sm md:text-base">{children}</div>
    </section>
  );
}
