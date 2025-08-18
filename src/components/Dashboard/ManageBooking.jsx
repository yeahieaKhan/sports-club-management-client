import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contextApi/AuthContext";

const ManageBooking = () => {
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axios.get(
        "https://sports-club-management-server.vercel.app/manage/booking?status=pending"
      );
      return res.data;
    },
  });
  console.log(bookings);

  const mutation = useMutation({
    mutationFn: async ({ id, status, email }) => {
      const res = await axios.patch(
        `https://sports-club-management-server.vercel.app/bookings/${id}`,
        {
          status,
          payment_status: "unpaid",
          email,
        }
      );
      return res.data; //
    },
    onSuccess: (data) => {
      console.log("status and payment status handle", data);
      Swal.fire("Success!", data.message || "Booking updated.", "success");
      queryClient.invalidateQueries(["pendingBookings"]); // ✅ Refetch
    },
    onError: (error) => {
      console.error(error);
      Swal.fire("Error!", "Something went wrong!", "error");
    },
  });

  const handleAction = (id, status, email) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this booking?`,
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status, email });
      }
    });
  };

  if (isLoading) return <p>Loading pending bookings...</p>;
  if (isError) return <p>Error fetching bookings.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">User Email</th>
              <th className="p-2 border">price</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="p-2 border">{booking.email}</td>
                <td className="p-2 border">{booking.price}</td>
                <td className="p-2 border">{booking.bookingDate}</td>
                <td className="p-2 border">
                  {" "}
                  <span className="bg-green-700 px-3 py-1 rounded-2xl text-white">
                    {booking.status}
                  </span>{" "}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() =>
                      handleAction(booking._id, "approved", booking.email)
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Acceptance
                  </button>
                  <button
                    onClick={() =>
                      handleAction(booking._id, "rejected", booking.email)
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Rejection
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBooking;
