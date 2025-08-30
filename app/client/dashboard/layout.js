"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Bell, Calendar, FileText, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      if (!user) {
        router.push("/login");
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (!session?.user) {
          router.push("/login");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold tracking-wide">Client Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link
            href="/client/dashboard/profile"
            className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition"
          >
            <User size={18} /> <span>Profile</span>
          </Link>
          <Link
            href="/client/dashboard/notices"
            className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition"
          >
            <FileText size={18} /> <span>Notices</span>
          </Link>
          <Link
            href="/client/dashboard/notifications"
            className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition"
          >
            <Bell size={18} /> <span>Notifications</span>
          </Link>
          <Link
            href="/client/dashboard/appointments"
            className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition"
          >
            <Calendar size={18} /> <span>Appointments</span>
          </Link>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded mt-auto hover:bg-red-600 transition"
        >
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white shadow p-4 rounded mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <span className="text-gray-600">
            Welcome, {user.user_metadata?.full_name || user.email} 👋
          </span>
        </header>

        {/* Page Content */}
        <main className="bg-white shadow rounded p-6">{children}</main>
      </div>
    </div>
  );
}
