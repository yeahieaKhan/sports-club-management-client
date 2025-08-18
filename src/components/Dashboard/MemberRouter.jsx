import React, { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthContext";
import useUsersRole from "../../hooks/useUsersRole";

const MemberRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUsersRole();

  if (loading || roleLoading) {
    return <p>Loading.................</p>;
  }

  if (!user || role !== "member") {
    return <Navigate to="/forbidden" state={{ from: location.pathname }} />;
  }

  return children;
};

export default MemberRouter;
