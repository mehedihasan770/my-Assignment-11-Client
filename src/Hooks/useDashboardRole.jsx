import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDashboardRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });

  return { roleData, roleLoading };
};

export default useDashboardRole;
