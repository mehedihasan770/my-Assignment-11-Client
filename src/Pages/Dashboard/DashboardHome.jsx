import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import Loader from "../../Components/Loading/Loader";
import useDashboardRole from "../../Hooks/useDashboardRole";
import Title from "../../Components/Title/Title";
import UserDashboard from "../../Components/Dashboard/UserDashboard";
import CreatorDashboard from "../../Components/Dashboard/CreatorDashboard";
import AdminDashboard from "../../Components/Dashboard/AdminDashboard";

const DashboardHome = () => {
  const { loading } = useAuth();
  const { roleData, roleLoading } = useDashboardRole();

  if (loading || roleLoading) return <Loader />;


  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Title>Welcome to Dashboard</Title>
      <main>
        {roleData?.role === "admin" ? (
          <div className="text-center">
            <AdminDashboard/>
          </div>
        ) : roleData?.role === "creator" ? (
          <div className="text-center">
            <CreatorDashboard/>
          </div>
        ) : (
          <div className="text-center">
            <UserDashboard/>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardHome;