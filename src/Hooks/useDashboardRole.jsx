import React from "react";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../FirebaseConfig/Firebase";
import useAxiosSecure from "./useAxiosSecure";

const useDashboardRole = () => {
  const axiosSecure = useAxiosSecure();
  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", auth.currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${auth.currentUser?.email}`);
      return res.data;
    },
  });

  console.log(roleData, auth.currentUser)

  return { roleData, roleLoading };
};

export default useDashboardRole;
