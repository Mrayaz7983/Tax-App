"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const services = [
  { id: 1, name: "Income Tax Filing", status: "Completed" },
  { id: 2, name: "Sales Tax Registration", status: "Pending" },
  { id: 3, name: "Company NTN Issuance", status: "In Progress" },
];

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-2xl shadow-xl"
    >
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="text-green-600" /> Tax Services Tracking
      </h1>

      <div className="overflow-hidden border rounded-xl shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr
                key={service.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-green-50 transition`}
              >
                <td className="p-3">{service.name}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      service.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : service.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
