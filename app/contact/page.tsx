import { Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | Hurlung Premier League",
  description: "Contact details for Hurlung Premier League (HPL)",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-12 mt-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">📞 Contact Us</h1>
          <p className="text-slate-300 mt-2">Hurlung Premier League (HPL)</p>
        </header>

        {/* Contact Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Phone Numbers */}
          <ContactCard
            icon={<Phone className="w-6 h-6 text-green-400" />}
            title="Phone Numbers"
          >
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Tournament Head:</span>{" "}
                <a
                  href="tel:9876543210"
                  className="text-cyan-400 hover:underline"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="font-medium">Organizer:</span>{" "}
                <a
                  href="tel:9123456780"
                  className="text-cyan-400 hover:underline"
                >
                  +91 91234 56780
                </a>
              </li>
              <li>
                <span className="font-medium">Support:</span>{" "}
                <a
                  href="tel:9012345678"
                  className="text-cyan-400 hover:underline"
                >
                  +91 90123 45678
                </a>
              </li>
            </ul>
          </ContactCard>

          {/* Email */}
          <ContactCard
            icon={<Mail className="w-6 h-6 text-yellow-400" />}
            title="Email"
          >
            <p>
              <a
                href="mailto:hplofficial@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                hplofficial@gmail.com
              </a>
            </p>
          </ContactCard>

          {/* Location */}
          <ContactCard
            icon={<MapPin className="w-6 h-6 text-red-400" />}
            title="Location"
          >
            <p>Hurlung, Jharkhand, India</p>
          </ContactCard>

          {/* Availability */}
          <ContactCard title="Availability">
            <p>📅 Available on match days & office hours</p>
            <p className="text-sm text-slate-400 mt-2">10:00 AM – 6:00 PM</p>
          </ContactCard>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center bg-slate-900/60 border border-cyan-500/20 rounded-xl p-6">
          <p className="text-slate-300">
            For any queries related to registration, teams, or matches, feel
            free to contact us using the details above.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------- */
/* Reusable Card Component */
/* ---------------------------------- */

function ContactCard({
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
      <div className="text-slate-300">{children}</div>
    </section>
  );
}
