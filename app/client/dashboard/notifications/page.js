"use client";
import { AlertTriangle, Info, Bell } from "lucide-react";

export default function ClientNotifications() {
  const notifications = [
    { msg: "Income Tax Filing due on Sep 15", type: "alert" },
    { msg: "Withholding Statement completed", type: "info" },
    { msg: "Audit scheduled for Sep 25", type: "reminder" },
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case "alert":
        return { bg: "bg-rose-500/20", text: "text-rose-400", icon: <AlertTriangle className="w-5 h-5 text-rose-400" /> };
      case "reminder":
        return { bg: "bg-blue-500/20", text: "text-blue-400", icon: <Bell className="w-5 h-5 text-blue-400" /> };
      default:
        return { bg: "bg-emerald-500/20", text: "text-emerald-400", icon: <Info className="w-5 h-5 text-emerald-400" /> };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-400 mb-6">Notifications</h1>

        <div className="space-y-4">
          {notifications.map((n, idx) => {
            const style = getNotificationStyle(n.type);
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-4 rounded-2xl shadow-lg border border-slate-700 backdrop-blur-md ${style.bg} hover:scale-105 transition-transform duration-200`}
              >
                <div>{style.icon}</div>
                <p className={`text-sm font-medium ${style.text}`}>{n.msg}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
