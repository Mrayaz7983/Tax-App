"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, User, Award } from "lucide-react";

export default function ClientInfo() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) console.error(error);
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  if (!profile) {
    return <p className="text-white text-center mt-10">Profile not found.</p>;
  }

  const initials = profile.name
    ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "C";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-700">
          
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-500 text-white text-2xl font-bold">
              {initials}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-teal-400">{profile.name}</h1>
              <p className="text-slate-300 text-sm">Role: {profile.role}</p>
            </div>
          </div>

          {/* Info Fields */}
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-teal-400" />
              <span className="text-slate-200">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-teal-400" />
              <span className="text-slate-200">
                Joined: {new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
