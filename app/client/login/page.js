"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase";

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError || !authData.user) throw authError || new Error("Login failed");

      const userId = authData.user.id;

      // Fetch profile (single object)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile) throw profileError || new Error("Profile not found");

      // Only allow clients here
      if (profile.role !== "client") throw new Error("Access denied: only clients can login here");

      // Redirect
      router.push("/client/dashboard");

      Swal.fire({ icon: "success", title: "Login Successful", confirmButtonColor: "#10b981" });

    } catch (err) {
      Swal.fire({ icon: "error", title: "Login Failed", text: err.message || "Invalid credentials", confirmButtonColor: "#ef4444" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800/80 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-6">Client Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl" required />
          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-xl disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don’t have an account? <a href="/client/signup" className="text-emerald-500 font-semibold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
