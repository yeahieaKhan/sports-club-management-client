import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

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
        "http://localhost:8000/manage/booking?status=pending"
      );
      return res.data;
    },
  });
  console.log(bookings);

  const mutation = useMutation({
    mutationFn: async ({ id, status, email }) => {
      const res = await axios.patch(`http://localhost:8000/bookings/${id}`, {
        status,
        payment_status: "unpaid",
        email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success!", data.message || "Booking updated.", "success");
      queryClient.invalidateQueries(["pendingBookings"]);
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📅 Manage Bookings
      </h2>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl"></div>
          ))}
        </div>
      )}

      {isError && (
        <div className="alert alert-error shadow-lg">
          <span>Error loading bookings.</span>
        </div>
      )}

      {!isLoading && !isError && bookings.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No pending bookings found.
        </div>
      )}

      {!isLoading && !isError && bookings.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base font-semibold">
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.email}</td>
                  <td>${booking.price}</td>
                  <td>{booking.bookingDate}</td>
                  <td>
                    <span className="badge badge-success text-white uppercase">
                      {booking.status}
                    </span>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() =>
                        handleAction(booking._id, "approved", booking.email)
                      }
                      className="btn btn-sm btn-success text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleAction(booking._id, "rejected", booking.email)
                      }
                      className="btn btn-sm btn-error text-white"
                    >
                      Reject
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

export default ManageBooking;
