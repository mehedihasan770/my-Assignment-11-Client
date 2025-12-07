import React from "react";
import { useAuth } from "../Hooks/useAuth";
import useDashboardRole from "../Hooks/useDashboardRole";
import { useNavigate } from "react-router";
import Loader from "../Components/Loading/Loader";

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const { roleData, roleLoading } = useDashboardRole();
  if ((loading, roleLoading))return <Loader></Loader>;
  if (roleData !== "admin") return navigate("/");
  return children;
};

export default AdminRoutes;
