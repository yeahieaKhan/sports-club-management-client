import React, { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  const {
    data: courtsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: () =>
      axios
        .get("https://sports-club-management-server.vercel.app/courts")
        .then((res) => res.data),
  });

  const { data: roleUser = [] } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      const res = await axios.get(
        "https://sports-club-management-server.vercel.app/users/role/user"
      );
      return res.data;
    },
  });
  console.log(roleUser);

  const { data: roleMembers = [] } = useQuery({
    queryKey: ["role-members"],
    queryFn: async () => {
      const res = await axios.get(
        "https://sports-club-management-server.vercel.app/users/role/member"
      );
      return res.data;
    },
  });
  console.log(roleMembers);

  return (
    <div className="p-6 space-y-8">
      {/* Profile Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl p-6">
        <figure className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} alt="Admin" />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {user.displayName}
            <div className="badge badge-success">Admin</div>
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm mt-2">
            Total Courts Managed:{" "}
            <span className="font-semibold">{courtsData.length}</span>
          </p>
          <p className="text-sm mt-2">
            Total Users:{" "}
            <span className="font-semibold">{roleUser.length}</span>
          </p>
          <p className="text-sm mt-2">
            Total Members:{" "}
            <span className="font-semibold">{roleMembers.length}</span>
          </p>
        </div>
      </div>

      {/* Court Overview
      <div>
        <h3 className="text-xl font-semibold mb-4">Court Overview</h3>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-32 w-full rounded-lg"></div>
            ))}
          </div>
        )}

        {isError && (
          <div className="alert alert-error shadow-lg">
            <span>Error fetching courts: {error.message}</span>
          </div>
        )}

        {!isLoading && !isError && courtsData.length === 0 && (
          <p className="text-center text-gray-500">No courts found.</p>
        )}

        {!isLoading && !isError && courtsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courtsData.map((court) => (
              <div
                key={court._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <figure>
                  <img
                    src={court.image}
                    alt={court.type}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title capitalize">{court.type}</h2>
                  <p>
                    <strong>Slot Time:</strong> {court.slot_time}
                  </p>
                  <p>
                    <strong>Price:</strong> ${court.price}
                  </p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-info">Court</div>
                    <div className="badge badge-outline">{court.email}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AdminProfile;
