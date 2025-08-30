"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { supabaseWithErrorHandling } from "../lib/supabase"; 
import { handleSupabaseError, isValidEmail } from "../lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabaseWithErrorHandling.auth.signInWithPassword({ email, password });
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonColor: "#10b981",
      });

      router.push("/admin/dashboard");
    } catch (err) {
      const userFriendlyError = handleSupabaseError(err, "login");
      setError(userFriendlyError);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: userFriendlyError,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire({ icon: "warning", title: "Email Required", text: "Please enter your email first.", confirmButtonColor: "#ca8a04" });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({ icon: "warning", title: "Invalid Email", text: "Please enter a valid email address.", confirmButtonColor: "#ca8a04" });
      return;
    }

    setForgotPasswordLoading(true);
    try {
      const { error } = await supabaseWithErrorHandling.auth.resetPasswordForEmail(email);
      if (error) throw error;

      Swal.fire({ icon: "success", title: "Password Reset Email Sent", text: "Check your inbox to reset your password.", confirmButtonColor: "#10b981" });
    } catch (err) {
      const userFriendlyError = handleSupabaseError(err, "password reset");
      Swal.fire({ icon: "error", title: "Error", text: userFriendlyError, confirmButtonColor: "#ef4444" });
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-8">Login to your account to manage your taxes efficiently.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            required
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            required
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-emerald-500 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-emerald-500 font-semibold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
