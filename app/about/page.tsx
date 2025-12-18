import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-sky-50 to-indigo-50 px-6 py-18">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-wide">
          About Hurlung Premier League
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          A celebration of cricket, talent, and sportsmanship
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* About Section */}
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-md">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">What is HPL?</h2>
            <p className="text-slate-600 leading-relaxed">
              The <strong>Hurlung Premier League (HPL)</strong> is a
              community-driven cricket league established to promote local
              talent, encourage competitive sportsmanship, and bring together
              cricket lovers under one professional platform. HPL is designed
              with a structured format similar to top-level leagues, ensuring
              fairness, excitement, and transparency.
            </p>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-md">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              Our vision is to create a sustainable cricket ecosystem at the
              local level, where young players get recognition, teams compete
              with pride, and the community enjoys high-quality cricket
              entertainment.
            </p>
          </CardContent>
        </Card>

        {/* League Structure */}
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-md">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
              League Structure
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Multiple registered teams with official owners</li>
              <li>Player registration and verification process</li>
              <li>Transparent auction system</li>
              <li>Season-based tournaments</li>
              <li>Fair play rules and discipline</li>
            </ul>
          </CardContent>
        </Card>

        {/* Why HPL */}
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-md">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Why HPL?</h2>
            <p className="text-slate-600 leading-relaxed">
              HPL is more than just a tournament. It is a platform that values
              integrity, teamwork, and passion for cricket. By combining
              technology with sports, HPL ensures smooth management of players,
              teams, auctions, and seasons.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Hurlung Premier League. All rights
        reserved.
      </div>
    </div>
  );
}
