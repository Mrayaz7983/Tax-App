"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ntn: "",
    address: "",
  });

  // Fetch clients for logged-in user
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setLoading(false);

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) console.error("Error fetching clients:", error);
      else setClients(data || []);

      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please login first.");

    const { data, error } = await supabase
      .from("clients")
      .insert([{ ...formData, user_id: user.id }])
      .select();

    if (error) return console.error("Error saving client:", error);

    setClients([data[0], ...clients]);
    setFormData({ name: "", email: "", phone: "", ntn: "", address: "" });
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) return console.error("Error deleting client:", error);

    setClients(clients.filter((c) => c.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-8 text-teal-400"
      >
        Client Management
      </motion.h1>

      {/* Add Client Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-10 border border-gray-700 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">Add New Client</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSave}
        >
          {["name", "email", "phone", "ntn", "address"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="p-4 rounded-lg border border-gray-600 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500 text-gray-100 col-span-2"
            />
          ))}
          <button
            type="submit"
            className="col-span-2 mt-3 bg-teal-500 hover:bg-teal-600 text-gray-900 py-3 rounded-lg font-semibold transition shadow-md"
          >
            Save Client
          </button>
        </form>
      </motion.div>

      {/* Client Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 max-w-6xl mx-auto overflow-x-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">Client List</h2>
        <table className="min-w-full border-collapse text-gray-100">
          <thead>
            <tr className="bg-gray-700 text-gray-100 uppercase text-sm tracking-wide">
              {["Name", "Email", "Phone", "NTN", "Address", "Actions"].map(
                (th, idx) => (
                  <th
                    key={idx}
                    className={`p-4 ${idx === 0 ? "rounded-tl-lg" : ""} ${
                      idx === 5 ? "rounded-tr-lg" : ""
                    }`}
                  >
                    {th}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No clients found
                </td>
              </tr>
            ) : (
              clients.map((c, index) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-4">{c.name}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4">{c.ntn}</td>
                  <td className="p-4">{c.address}</td>
                  <td className="p-4 flex gap-3">
                    <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg font-semibold transition shadow-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
