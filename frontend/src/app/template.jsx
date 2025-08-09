// app/template.jsx
"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardTemplate({ children }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      {user && <Sidebar />}

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
