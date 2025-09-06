"use client";
import Link from "next/link";
import { Users, Calendar, Megaphone, Bell, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  const sections = [
    {
      title: "Clients",
      desc: "View and manage client data.",
      icon: <Users className="w-8 h-8 text-sky-400" />,
      link: "/admin/dashboard/clients",
    },
    {
      title: "Appointments",
      desc: "Check and book WhatsApp appointments.",
      icon: <Calendar className="w-8 h-8 text-sky-400" />,
      link: "/admin/dashboard/appointments",
    },
    {
      title: "Notices",
      desc: "Send and manage notices for clients.",
      icon: <Megaphone className="w-8 h-8 text-sky-400" />,
      link: "/admin/dashboard/notices",
    },
    {
      title: "Services",
      desc: "Track and manage tax services.",
      icon: <Briefcase className="w-8 h-8 text-sky-400" />,
      link: "/admin/dashboard/services",
    },
    {
      title: "Notifications",
      desc: "Send updates and alerts.",
      icon: <Bell className="w-8 h-8 text-sky-400" />,
      link: "/admin/dashboard/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-sky-400 mb-3">
          Admin Dashboard
        </h1>
        <p className="text-slate-300 text-lg">
          Welcome! Manage clients, appointments, services, and more all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {sections.map((item, index) => (
            <Link key={index} href={item.link}>
              <div className="bg-slate-800/70 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 rounded-2xl p-6 cursor-pointer border border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-slate-700 rounded-xl">{item.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100">
                      {item.title}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
