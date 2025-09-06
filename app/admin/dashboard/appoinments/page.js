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
        .from("appointments") // use your exact table name
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-2xl shadow-xl max-w-5xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <CalendarDays className="text-blue-600" /> My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600 mb-6">
          No appointments found. Book one via WhatsApp!
        </p>
      ) : (
        <table className="min-w-full border-collapse text-gray-700 mt-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{appt.name}</td>
                <td className="p-3">{appt.phone}</td>
                <td className="p-3">{new Date(appt.date).toLocaleString()}</td>
                <td className="p-3">{appt.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">WhatsApp Appointment</h2>
        <p className="mb-4">Click below to schedule via WhatsApp.</p>
        <a
          href="https://wa.me/923452173906"
          target="_blank"
          className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Phone /> Book on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
