"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, CalendarDays, FileText, Bell } from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) console.error(error);
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400" />
      </div>
    );
  }

  const sections = [
    {
      title: "My Info",
      desc: "View your personal details.",
      icon: <Users className="w-8 h-8 text-teal-400" />,
      link: "/client/dashboard/Info",
    },
    {
      title: "Appointments",
      desc: "Check your appointments.",
      icon: <CalendarDays className="w-8 h-8 text-teal-400" />,
      link: "/client/dashboard/appointments",
    },
    {
      title: "Services",
      desc: "Track your tax services.",
      icon: <FileText className="w-8 h-8 text-teal-400" />,
      link: "/client/dashboard/services",
    },
    {
      title: "Notifications",
      desc: "View updates and alerts.",
      icon: <Bell className="w-8 h-8 text-teal-400" />,
      link: "/client/dashboard/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-teal-400 mb-3">
          Welcome, {user?.email}
        </h1>
        <p className="text-slate-300 text-lg">
          This is your client dashboard. You can manage your appointments, services, and notifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
          {sections.map((item, idx) => (
            <Link key={idx} href={item.link}>
              <div className="bg-slate-800/70 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 rounded-2xl p-6 cursor-pointer border border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-slate-700 rounded-xl">{item.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100">{item.title}</h2>
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
