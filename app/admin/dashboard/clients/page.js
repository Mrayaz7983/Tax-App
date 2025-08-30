"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ClientsPage() {
  const [clients] = useState([
    { id: 1, name: "Ali Khan", email: "ali@email.com", phone: "03001234567", ntn: "1234567", address: "Karachi" },
    { id: 2, name: "Sara Ahmed", email: "sara@email.com", phone: "03009876543", ntn: "7654321", address: "Lahore" },
  ]);

  return (
    <div className="p-6">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-gray-800 mb-6"
      >
        Client Data
      </motion.h1>

      {/* Add Client Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Client</h2>
        <form className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Client Name" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input type="email" placeholder="Email" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input type="text" placeholder="Phone" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input type="text" placeholder="NTN" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input type="text" placeholder="Address" className="p-3 border rounded-lg col-span-2 focus:ring-2 focus:ring-blue-400" />
          <button className="col-span-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
            Save Client
          </button>
        </form>
      </motion.div>

      {/* Client Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Client List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left rounded-tl-lg">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">NTN</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, index) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.ntn}</td>
                <td>{c.address}</td>
                <td>
                  <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg mr-2">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
