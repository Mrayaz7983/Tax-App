"use client";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Ayaz Ahmed",
    email: "ayaz.ahmed@example.com",
    phone: "+92 312 9876543",
    address: "Karachi, Pakistan",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center space-x-6 border-b pb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-900">{user.name}</h2>
            <p className="text-gray-500">Client Profile</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <Mail className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <Phone className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <MapPin className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Edit Profile
          </button>
          <button className="px-5 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
