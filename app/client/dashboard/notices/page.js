"use client";
import { Bell } from "lucide-react";

export default function NoticesPage() {
  const notices = [
    { id: 1, title: "System Maintenance", date: "Aug 27, 2025", details: "The system will be under maintenance from 2 AM to 5 AM." },
    { id: 2, title: "New Policy Update", date: "Aug 20, 2025", details: "Please review the updated terms and conditions." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2 border-b pb-4">
          <Bell className="w-6 h-6 text-blue-600" />
          Notices
        </h2>

        <div className="mt-6 space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="p-5 border rounded-lg bg-blue-50 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-blue-700">{notice.title}</h3>
              <p className="text-sm text-gray-500">{notice.date}</p>
              <p className="mt-2 text-gray-700">{notice.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
