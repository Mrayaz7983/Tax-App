"use client";
import { motion } from "framer-motion";
import { CalendarDays, Phone } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-2xl shadow-xl"
    >
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <CalendarDays className="text-blue-600" /> Book an Appointment
      </h1>
      <p className="text-gray-600 mb-6">
        WhatsApp ke zariye apna appointment book karein.
      </p>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md">
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
