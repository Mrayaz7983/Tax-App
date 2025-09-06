"use client";
import { CalendarDays } from "lucide-react";

export default function ClientAppointments() {
  const appointments = [
    { title: "Income Tax Filing", date: "2025-09-15", status: "Pending" },
    { title: "Withholding Statement", date: "2025-09-10", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-teal-400 mb-6">Appointments</h1>
        <p className="text-slate-300 mb-6">
          Here are your upcoming and completed appointments. Stay on top of your tax tasks.
        </p>

        <div className="space-y-5">
          {appointments.map((a, idx) => (
            <div
              key={idx}
              className="bg-slate-800/70 backdrop-blur-md p-5 rounded-2xl flex justify-between items-center border border-slate-700 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-700 rounded-xl">
                  <CalendarDays className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{a.title}</p>
                  <p className="text-sm text-slate-400">{new Date(a.date).toLocaleDateString()}</p>
                </div>
              </div>
              <span
                className={`px-4 py-1 rounded-full text-xs font-semibold ${
                  a.status === "Completed"
                    ? "bg-emerald-500/30 text-emerald-400"
                    : "bg-amber-500/30 text-amber-400"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
