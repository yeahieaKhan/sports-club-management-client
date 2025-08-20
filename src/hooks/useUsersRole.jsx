import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";

const useUsersRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const email = user?.email;

  const {
    data: role = "user",
    isLoading: roleLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    enabled: !authLoading && !!email,
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/users/${email}/role`);
      console.log(res.data);

      return res.data.role;
    },
  });

  return {
    role,
    roleLoading: authLoading || roleLoading,
    isError,
    error,
    refetch,
  };
};

export default useUsersRole;
