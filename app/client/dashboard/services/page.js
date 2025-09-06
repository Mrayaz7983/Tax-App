"use client";
export default function ClientServices() {
  const services = [
    { title: "NTN Registration", status: "Completed" },
    { title: "Sales Tax Return", status: "Pending" },
    { title: "Audit Assistance", status: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-400 mb-6">Services</h1>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, idx) => {
            const statusColors = {
              Completed: "bg-emerald-500/30 text-emerald-400",
              Pending: "bg-amber-500/30 text-amber-400",
              Scheduled: "bg-blue-500/30 text-blue-400",
            };
            return (
              <div
                key={idx}
                className="bg-slate-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-700 hover:scale-105 transition-transform duration-200"
              >
                <h2 className="font-semibold text-lg text-slate-100">{s.title}</h2>
                <span
                  className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[s.status]}`}
                >
                  {s.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
