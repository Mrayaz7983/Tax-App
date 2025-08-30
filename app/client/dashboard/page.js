import { User, Bell, CalendarCheck, FileText } from "lucide-react";

export default function DashboardHome() {
  const features = [
    {
      title: "Profile",
      desc: "Update your personal details and manage account settings.",
      icon: <User className="w-8 h-8 text-green-700" />,
      link: "/client/dashboard/profile",
    },
    {
      title: "Notices",
      desc: "Stay updated with the latest tax-related notices.",
      icon: <FileText className="w-8 h-8 text-green-700" />,
      link: "/client/dashboard/notices",
    },
    {
      title: "Notifications",
      desc: "View alerts and important system notifications.",
      icon: <Bell className="w-8 h-8 text-green-700" />,
      link: "/client/dashboard/notifications",
    },
    {
      title: "Appointments",
      desc: "Book a meeting with our consultants easily.",
      icon: <CalendarCheck className="w-8 h-8 text-green-700" />,
      link: "/client/dashboard/appointments",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-green-900">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 mt-2">
            Manage your profile, check notices, view notifications, and book appointments all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-green-900 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
