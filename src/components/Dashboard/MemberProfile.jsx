import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthContext";

const MemberProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user.displayname);

  const {
    data: member,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["specific-member", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://sports-club-management-server.vercel.app/users/role-member?email=${user.email}`
      );
      return res.data;
    },
  });
  console.log(member);

  if (isLoading) return <p>Loading...</p>;
  if (error || !member) return <p>No member found or not a member role.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Member Profile</h2>

      <div className="border p-4 rounded-md shadow bg-white">
        <figure className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} alt="Admin" />
          </div>
        </figure>
        <p>
          <strong>Email:</strong> {member.email}
        </p>
        <p>
          <strong>Name:</strong> {user.displayName}
        </p>
        <p>
          <strong>Joined At:</strong>{" "}
          {new Date(
            member.joined_at || member.created_at || member.created_At
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MemberProfile;
