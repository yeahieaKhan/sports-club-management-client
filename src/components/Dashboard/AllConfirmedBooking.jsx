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
      const res = await axios.get(
        "https://sports-club-management-server.vercel.app/confirmed-booking"
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center py-10">Failed to load data</p>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">
        All Confirmed Bookings
      </h2>

      {bookingsConfirmed.length === 0 ? (
        <p className="text-center text-gray-500">
          No confirmed bookings found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-gray-800 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Court Type</th>
                <th className="px-6 py-3">Booked By</th>
                <th className="px-6 py-3">Booking Date</th>
                <th className="px-6 py-3">Booked Slots</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookingsConfirmed.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{booking.courtType}</td>
                  <td className="px-6 py-4">{booking.name}</td>
                  <td className="px-6 py-4">{booking.bookingDate}</td>
                  <td className="px-6 py-4">{booking.slots.join(", ")}</td>
                  <td className="px-6 py-4">৳{booking.price}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">
                    {booking.payment_status}
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
