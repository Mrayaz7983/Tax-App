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
        confirmButtonColor: "#16a34a"
      });

      router.push("/login");
    } catch (err) {
      const userFriendlyError = handleSupabaseError(err, "signup");
      setError(userFriendlyError);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: userFriendlyError,
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-900 via-green-700 to-green-500 py-16">
      <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-200">
        <h1 className="text-4xl font-extrabold text-center text-green-900 mb-6 animate-fadeInDown">Create an Account</h1>
        <p className="text-center text-gray-700 mb-8 animate-fadeInUp">Join our platform to manage your taxes easily and securely.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {error && <p className="text-red-600 text-sm animate-fadeIn">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-green-900 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
