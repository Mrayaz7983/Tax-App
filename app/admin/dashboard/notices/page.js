"use client";
import { motion } from "framer-motion";
import { CalendarDays, StickyNote } from "lucide-react";

export default function NoticesPage() {
  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.h1
        className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center gap-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StickyNote className="w-7 h-7 text-blue-600" />
        Notice Board
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Yahan par Calendar aur Instructions ka UI hoga.
      </motion.p>

      {/* Calendar + Instructions Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Calendar Section */}
        <motion.div
          className="p-5 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CalendarDays className="w-10 h-10 text-green-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
          <p className="text-gray-500 text-sm mt-2">Yahan par calendar component add hoga.</p>
        </motion.div>

        {/* Instructions Section */}
        <motion.div
          className="p-5 bg-white rounded-xl shadow-md border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Instructions</h2>
          <textarea
            placeholder="Likho yahan instructions..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            rows="6"
          />
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Save Instructions
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
