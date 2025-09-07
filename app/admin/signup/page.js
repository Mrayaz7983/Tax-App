"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase"; 

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Supabase signup request
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }, // custom field stored in user_metadata
        },
      });

      if (error) throw error;

      // ✅ Handle confirm email flow
      if (data?.user && !data?.user?.confirmed_at) {
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "Please check your email to confirm your account",
          confirmButtonColor: "#10b981",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "Your account has been created",
          confirmButtonColor: "#10b981",
        });
      }

      router.push("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message || "Something went wrong",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800/80 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/admin/login"
            className="text-emerald-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
