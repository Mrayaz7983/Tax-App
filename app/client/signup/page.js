"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase"; 

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); 
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError || !authData.user) throw authError || new Error("Signup failed");

      const userId = authData.user.id;

      // 2. Insert profile into 'profiles' table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId, 
          email,
          role,
        },
      ]);
      if (profileError) throw profileError;

      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Your account has been created. Please login.",
        confirmButtonColor: "#10b981",
      });

      router.push(`/${role}/login`); // redirect to role-specific login
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

          {/* Role selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-xl"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>

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
            href={`/${role}/login`}
            className="text-emerald-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
