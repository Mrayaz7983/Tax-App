"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { supabaseWithErrorHandling } from "../lib/supabase"; 
import { handleSupabaseError, isValidEmail, validatePassword } from "../lib/utils"; 

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!fullName || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      setError(passwordCheck.message);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabaseWithErrorHandling.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Please check your email to confirm your account",
        confirmButtonColor: "#10b981"
      });

      router.push("/login");
    } catch (err) {
      const userFriendlyError = handleSupabaseError(err, "signup");
      setError(userFriendlyError);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: userFriendlyError,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-6">Create an Account</h1>
        <p className="text-center text-gray-400 mb-8">Join our platform to manage your taxes efficiently.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            required
          />

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-500 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
