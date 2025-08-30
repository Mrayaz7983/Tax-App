"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { supabaseWithErrorHandling } from "../lib/supabase";
import Link from "next/link";
import { Users, Calendar, Megaphone, Bell, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseWithErrorHandling.auth.getSession().then(session => {
      if (!session) {
        router.push("/login"); 
      } else {
        setLoading(false); 
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  const sections = [
    { title: "Clients", desc: "View and manage client data.", icon: <Users className="w-8 h-8 text-green-600" />, link: "/admin/dashboard/clients" },
    { title: "Appointments", desc: "Check and book WhatsApp appointments.", icon: <Calendar className="w-8 h-8 text-green-600" />, link: "/admin/dashboard/appointments" },
    { title: "Notices", desc: "Send and manage notices for clients.", icon: <Megaphone className="w-8 h-8 text-green-600" />, link: "/admin/dashboard/notices" },
    { title: "Services", desc: "Track and manage tax services.", icon: <Briefcase className="w-8 h-8 text-green-600" />, link: "/admin/dashboard/services" },
    { title: "Notifications", desc: "Send updates and alerts.", icon: <Bell className="w-8 h-8 text-green-600" />, link: "/admin/dashboard/notifications" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-800 mb-3">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome! Manage clients, appointments, services, and more all in one place.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {sections.map((item, index) => (
            <Link key={index} href={item.link}>
              <div className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 rounded-2xl p-6 cursor-pointer border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl">{item.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
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
