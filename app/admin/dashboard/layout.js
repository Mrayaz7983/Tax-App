"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseWithErrorHandling, getCurrentUser } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/utils";

// Fonts import karna optional hai
// import { GeistSans, GeistMono } from "@/lib/fonts";

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
          if (!currentUser) {
            router.push("/login");
            return;
          }
          setUser(currentUser);
          setLoading(false);
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

    // Listen for auth state changes
    const { data: { subscription } } = supabaseWithErrorHandling.auth.onAuthStateChange(
      (event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null);
          if (!session?.user && event !== "INITIAL_SESSION") {
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
      console.error("Logout error:", error, userFriendlyError);
      router.push("/login");
    }
  };

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

  if (!user) return null; // fallback

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased`} // agar fonts add karne ho, use `${GeistSans.variable} ${GeistMono.variable} antialiased`
      >
        {/* Optional: Dashboard header */}
        <header className="bg-green-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded flex items-center space-x-1"
          >
            Logout
          </button>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
