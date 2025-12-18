export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-sky-50 to-indigo-50 px-6 py-18">
      <h1 className="text-center text-4xl font-bold text-slate-400 mb-14">
        Loading Teams...
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-96 rounded-3xl bg-slate-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
