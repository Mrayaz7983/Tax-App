"use client";
import { Calendar, Clock } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2 border-b pb-4">
          <Calendar className="w-6 h-6 text-green-600" />
          Book Appointment
        </h2>

        <form className="mt-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Enter your name" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Time</label>
            <div className="flex items-center gap-2">
              <Clock className="text-green-600" />
              <input type="time" className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason</label>
            <textarea rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Enter appointment reason"></textarea>
          </div>

          <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
