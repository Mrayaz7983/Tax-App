"use client";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-2xl shadow-xl"
    >
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Bell className="text-yellow-500" /> Send Notifications
      </h1>
      <p className="text-gray-600 mb-6">
        Yahan se clients ko direct notifications bhej sakte ho.
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Notification Title"
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <textarea
          rows="4"
          placeholder="Write your message..."
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Send Notification
        </button>
      </form>
    </motion.div>
  );
}
