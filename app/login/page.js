"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { supabaseWithErrorHandling } from "../lib/supabase";
import { handleSupabaseError, isValidEmail } from "../lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabaseWithErrorHandling.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonColor: "#166534",
      });
      router.push("/admin/dashboard");
    } catch (err) {
      const userFriendlyError = handleSupabaseError(err, "login");
      setError(userFriendlyError);
      
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: userFriendlyError,
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email first.",
        confirmButtonColor: "#ca8a04",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#ca8a04",
      });
      return;
    }

    setForgotPasswordLoading(true);
    try {
      const { error } = await supabaseWithErrorHandling.auth.resetPasswordForEmail(email);
      
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent",
        text: "Check your inbox to reset your password.",
        confirmButtonColor: "#166534",
      });
    } catch (err) {
      const userFriendlyError = handleSupabaseError(err, "password reset");
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: userFriendlyError,
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md mt-10 mb-10">
        <h1 className="text-3xl font-extrabold text-center text-green-900 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to your account to manage your taxes easily.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-green-700 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-900 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Do not have an account?{" "}
          <a
            href="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
