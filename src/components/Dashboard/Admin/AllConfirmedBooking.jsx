import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllConfirmedBooking = () => {
  const {
    data: bookingsConfirmed = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["confirmed-bookings"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/confirmed-booking");
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        ✅ All Confirmed Bookings
      </h2>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg">
          <span>Failed to load data.</span>
        </div>
      )}

      {!isLoading && !error && bookingsConfirmed.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No confirmed bookings found.
        </div>
      )}

      {!isLoading && !error && bookingsConfirmed.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Court Type</th>
                <th>Booked By</th>
                <th>Booking Date</th>
                <th>Booked Slots</th>
                <th>Price</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingsConfirmed.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.name}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.slots.join(", ")}</td>
                  <td>৳{booking.price}</td>
                  <td>
                    <span
                      className={`badge text-white uppercase ${
                        booking.payment_status === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {booking.payment_status}
                    </span>
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

export default AllConfirmedBooking;
