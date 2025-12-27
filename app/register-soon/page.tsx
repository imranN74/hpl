export default function RegistrationOpeningSoon() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#0A1F33] to-[#071A2E] flex items-center">
      <section className="w-full px-6 md:px-16 lg:px-24 py-24">
        {/* Top line */}
        <p className="text-sm tracking-widest text-white/50 uppercase mb-4">
          Hurlung Premier League
        </p>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
          Player Registration
        </h1>

        {/* Sub heading */}
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-yellow-400">
          Opening Soon
        </h2>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg text-white/70 leading-relaxed">
          The next season of the Hurlung Premier League is around the corner.
          Player registrations will begin shortly. Stay ready to be part of
          competitive tennis-ball cricket with top local talent.
        </p>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/10" />

        {/* Info row */}
        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 text-white/70">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/50">
              Format
            </p>
            <p className="mt-1 font-medium text-white">Tennis Cricket</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-white/50">
              Teams
            </p>
            <p className="mt-1 font-medium text-white">6 Franchise Teams</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-white/50">
              Location
            </p>
            <p className="mt-1 font-medium text-white">Hurlung, Jharkhand</p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-16 text-sm text-white/40">
          Official registration dates will be announced soon.
        </p>
      </section>
    </main>
  );
}
