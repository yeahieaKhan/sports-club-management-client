import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", searchTrigger],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/users/search?email=${searchTrigger}`
      );
      return res.data;
    },
    enabled: !!searchTrigger,
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">👥 All Users</h2>

      {/* 🔍 Search Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search user by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          onClick={() => setSearchTrigger(searchEmail)}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>

      {/* ⏳ Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl"></div>
          ))}
        </div>
      )}

      {/* ❌ Error */}
      {isError && (
        <div className="alert alert-error shadow-lg">
          <span>Failed to fetch users.</span>
        </div>
      )}

      {/* 📋 Table */}
      {!isLoading && !isError && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base font-semibold">
              <tr>
                <th>NO</th>
                <th>Email</th>
                <th>Role</th>
                <th>Account Created</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>
                    <span
                      className={`badge text-white capitalize ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "member"
                          ? "badge-info"
                          : "badge-neutral"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🛑 Empty */}
      {!isLoading && !isError && users.length === 0 && (
        <div className="text-center text-gray-500 text-lg">No users found.</div>
      )}
    </div>
  );
};

export default AllUsers;
