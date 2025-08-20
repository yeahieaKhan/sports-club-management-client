import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const ManageMember = () => {
  const queryClient = useQueryClient();

  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/users?role=member");
      return res.data;
    },
  });
  console.log(members);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:8000/users/${id}`);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        Swal.fire("Deleted!", "Member has been deleted.", "success");
        queryClient.invalidateQueries(["members"]);
      } else {
        Swal.fire("Error", res.data.message || "Failed to delete", "error");
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Manage Members</h2>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl"></div>
          ))}
        </div>
      )}

      {isError && (
        <div className="alert alert-error shadow-lg">
          <span>Error loading members: {error.message}</span>
        </div>
      )}

      {!isLoading && !isError && members.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No members found.
        </div>
      )}

      {!isLoading && !isError && members.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base font-semibold">
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined At</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member._id}>
                  <td>{index + 1}</td>
                  <td>{member.email}</td>
                  <td>
                    <span className="badge badge-info text-white uppercase">
                      {member.role}
                    </span>
                  </td>
                  <td>
                    {member.joined_at
                      ? new Date(member.joined_at).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="btn btn-sm btn-error text-white gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMember;
