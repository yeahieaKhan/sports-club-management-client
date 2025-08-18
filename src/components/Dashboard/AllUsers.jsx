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
        `https://sports-club-management-server.vercel.app/users/search?email=${searchTrigger}`
      );
      return res.data;
    },
    enabled: !!searchTrigger,
  });

  console.log(users);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Search user by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          onClick={() => setSearchTrigger(searchEmail)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading users...</p>}
      {isError && <p className="text-red-500">Failed to fetch users</p>}

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Account Create</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((user, index) => (
                <tr key={user._id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user.email || "N/A"}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    {new Date(user.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p>No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
