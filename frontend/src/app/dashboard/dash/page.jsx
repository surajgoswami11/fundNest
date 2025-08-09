// "use client";

// import Dashboard from "@/components/dashboard/Dashboard";
// // import DashboardTemplate from "@/app/template";
// import DashboardTemplate from "@/components/dashboard/Dashboard";
// const DashboardPage = () => {
//   return (
//     <DashboardTemplate>
//       <Dashboard />
//     </DashboardTemplate>
//   );
// };
// export default DashboardPage;

// app/(dashboard)/page.jsx
"use client";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>
        Welcome, {user.name} ({user.role})
      </h1>
      {/* Dashboard content here */}
    </div>
  );
}
