"use client";
import { BellRing } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, message: "Your appointment has been confirmed.", time: "10 mins ago" },
    { id: 2, message: "New message from Admin.", time: "1 hour ago" },
    { id: 3, message: "Profile updated successfully.", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2 border-b pb-4">
          <BellRing className="w-6 h-6 text-purple-600" />
          Notifications
        </h2>

        <ul className="mt-6 space-y-4">
          {notifications.map((n) => (
            <li key={n.id} className="flex items-start gap-3 p-4 border rounded-lg bg-purple-50 hover:bg-purple-100 transition">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-2"></div>
              <div>
                <p className="text-gray-800">{n.message}</p>
                <span className="text-sm text-gray-500">{n.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
