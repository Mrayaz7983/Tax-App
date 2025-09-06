"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CalendarDays, StickyNote } from "lucide-react";

export default function NoticesPage() {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstruction, setNewInstruction] = useState("");

  // Fetch instructions from Supabase
  useEffect(() => {
    const fetchInstructions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("notices") // Your table name in Supabase
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching notices:", error);
      else setInstructions(data || []);

      setLoading(false);
    };

    fetchInstructions();
  }, []);

  // Save a new instruction
  const handleSave = async () => {
    if (!newInstruction) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please login first.");

    const { data, error } = await supabase
      .from("notices")
      .insert([{ content: newInstruction, user_id: user.id }])
      .select();

    if (error) return console.error("Error saving notice:", error);

    setInstructions([data[0], ...instructions]);
    setNewInstruction("");
  };

  return (
    <motion.div
      className="p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 min-h-screen text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-teal-400 flex items-center gap-3">
          <StickyNote className="w-8 h-8 text-teal-400" />
          Notice Board
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Manage and schedule notices and instructions for your clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Calendar Card */}
        <motion.div
          className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays className="w-10 h-10 text-teal-400" />
            <h2 className="text-xl font-semibold text-gray-100">Calendar</h2>
          </div>
          <p className="text-gray-400 text-sm">
            View upcoming events and scheduled notices. Add new events to keep your clients informed.
          </p>
        </motion.div>

        {/* Instructions Card */}
        <motion.div
          className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col transition-transform hover:scale-105 hover:shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <StickyNote className="w-10 h-10 text-teal-400" />
            <h2 className="text-xl font-semibold text-teal-400">Instructions</h2>
          </div>

          {/* Input */}
          <textarea
            placeholder="Add instructions for your clients..."
            className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"
            rows={6}
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
          />

          <button
            className="mt-4 px-4 py-2 bg-teal-400 text-slate-900 rounded-lg shadow hover:bg-teal-500 transition"
            onClick={handleSave}
          >
            Save Instruction
          </button>

          {/* List of instructions */}
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-gray-400">Loading instructions...</p>
            ) : instructions.length === 0 ? (
              <p className="text-gray-400">No instructions found.</p>
            ) : (
              instructions.map((instr) => (
                <div
                  key={instr.id}
                  className="bg-slate-700 p-4 rounded-lg shadow border border-slate-600 text-gray-100"
                >
                  {instr.content}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
