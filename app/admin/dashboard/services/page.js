"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("User fetch error:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching services:", error);
      else setServices(data || []);

      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-slate-900 text-white rounded-2xl shadow-xl max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-teal-400">
        <FileText className="text-teal-400" /> Tax Services Tracking
      </h1>

      <div className="overflow-hidden border rounded-2xl shadow-lg border-gray-700">
        <table className="w-full border-collapse text-white">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-400">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service, idx) => (
                <tr
                  key={service.id}
                  className={`border-b border-gray-700 hover:bg-gray-800 transition`}
                >
                  <td className="p-4">{service.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.status === "Completed"
                          ? "bg-teal-400 text-slate-900"
                          : service.status === "Pending"
                          ? "bg-amber-400 text-slate-900"
                          : "bg-blue-400 text-slate-900"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
