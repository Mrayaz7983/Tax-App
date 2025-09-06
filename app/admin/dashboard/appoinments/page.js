"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CalendarDays, Phone } from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("User fetch error:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      if (error) console.error("Error fetching appointments:", error);
      else setAppointments(data || []);

      setLoading(false);
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-teal-400 mb-4 flex items-center gap-2">
          <CalendarDays /> My Appointments
        </h1>
        <p className="text-gray-300 mb-6">
          View and manage your appointments. Book new ones via WhatsApp below.
        </p>

        {appointments.length === 0 ? (
          <p className="text-gray-400 mb-6">
            No appointments found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg mb-6">
            <table className="min-w-full text-gray-100 border-collapse">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-slate-700 hover:bg-slate-700 transition"
                  >
                    <td className="p-4">{appt.name}</td>
                    <td className="p-4">{appt.phone}</td>
                    <td className="p-4">{new Date(appt.date).toLocaleString()}</td>
                    <td className="p-4">{appt.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-teal-400">WhatsApp Appointment</h2>
          <p className="mb-4 text-gray-300">Click below to schedule via WhatsApp.</p>
          <a
            href="https://wa.me/923452173906"
            target="_blank"
            className="flex items-center gap-2 bg-teal-400 text-slate-900 px-4 py-2 rounded-lg shadow hover:bg-teal-500 transition"
          >
            <Phone /> Book on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
