"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Calendar, Megaphone, Bell, Briefcase, LogOut } from "lucide-react";
import { supabaseWithErrorHandling, getCurrentUser } from "../../lib/supabase";
import { handleSupabaseError } from "../../lib/utils";

export default function AdminDashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (isMounted) {
          setUser(currentUser);
          setLoading(false);
          
          if (!currentUser) {
            router.push("/login");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Auth check error:", error);
          setAuthError("Authentication check failed");
          setLoading(false);
          router.push("/login");
        }
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabaseWithErrorHandling.auth.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null);
          setLoading(false);
          
          if (!session?.user && event !== 'INITIAL_SESSION') {
            router.push("/login");
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabaseWithErrorHandling.auth.signOut();
      router.push("/login");
    } catch (error) {
      const userFriendlyError = handleSupabaseError(error, "logout");
      console.error("Logout error:", error);
      
      // Still redirect to login even if logout fails
      router.push("/login");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state if authentication failed
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Authentication Error</div>
          <p className="text-gray-600 mb-4">{authError}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Redirect if no user (handled by useEffect, but this is a fallback)
  if (!user) {
    return null;
  }

  const sections = [
    {
      title: "Clients",
      desc: "View and manage client data.",
      icon: <Users className="w-5 h-5" />,
      link: "/admin/dashboard/clients",
    },
    {
      title: "Appointments",
      desc: "Check and book WhatsApp appointments.",
      icon: <Calendar className="w-5 h-5" />,
      link: "/admin/dashboard/appointments",
    },
    {
      title: "Notices",
      desc: "Send and manage notices for clients.",
      icon: <Megaphone className="w-5 h-5" />,
      link: "/admin/dashboard/notices",
    },
    {
      title: "Services",
      desc: "Track and manage tax services.",
      icon: <Briefcase className="w-5 h-5" />,
      link: "/admin/dashboard/services",
    },
    {
      title: "Notifications",
      desc: "Send updates and alerts.",
      icon: <Bell className="w-5 h-5" />,
      link: "/admin/dashboard/notifications",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          {sections.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded mt-auto hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white shadow p-4 rounded mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
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
