import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../contextApi/AuthContext";
import Swal from "sweetalert2";
import UpdateCourtModal from "./UpdateCourtModal";

const AllCourts = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [selectedCourt, setSelectedCourt] = useState(null);

  const {
    data: courts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userCourts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/adminCourts?email=${user?.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(
        `http://localhost:8000/courts/${id}?email=${user.email}`
      ),
    onSuccess: () => {
      Swal.fire("Deleted!", "Court has been removed.", "success");
      queryClient.invalidateQueries(["userCourts"]);
    },
    onError: () => Swal.fire("Error", "Failed to delete court", "error"),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This court will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        🏟️ My Created Courts
      </h2>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl"></div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="alert alert-error shadow-lg">
          <span>Failed to load courts.</span>
        </div>
      )}

      {/* Courts Table */}
      {!isLoading && !isError && courts.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base font-semibold text-center">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Type</th>
                <th>Slot Times</th>
                <th>Price (৳)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {courts.map((court, index) => (
                <tr key={court._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={court.image}
                      alt={court.type}
                      className="w-16 h-16 rounded object-cover mx-auto"
                    />
                  </td>
                  <td>{court.type}</td>
                  <td className="text-sm">
                    {Array.isArray(court.slots) ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {court.slots.map((slot, i) => (
                          <span
                            key={i}
                            className="badge badge-outline px-3 py-1"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    ) : (
                      court.slots
                    )}
                  </td>
                  <td className="font-semibold">৳{court.price}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setSelectedCourt(court)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(court._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && courts.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          You haven’t created any courts yet.
        </div>
      )}

      {/* Modal */}
      {selectedCourt && (
        <UpdateCourtModal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
          refetch={() =>
            queryClient.invalidateQueries(["userCourts", user?.email])
          }
        />
      )}
    </div>
  );
};

export default AllCourts;
