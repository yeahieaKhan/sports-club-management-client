import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../contextApi/AuthContext";
import { useNavigate } from "react-router";

const ApproveBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/approved/booking?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleViewMore = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        ✅ Approved Bookings
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
          No approved bookings found.
        </div>
      )}

      {!isLoading && !isError && bookings.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base font-semibold">
              <tr>
                <th>No</th>
                <th>User Email</th>
                <th>Court Type</th>
                <th>Booking Date</th>
                <th>Slot Time</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.email}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.bookingDate}</td>
                  <td className="text-sm">
                    {Array.isArray(booking.slots)
                      ? booking.slots.join(", ")
                      : booking.slots}
                  </td>
                  <td>${booking.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.payment_status === "paid"
                          ? "badge-success"
                          : "badge-error"
                      } text-white`}
                    >
                      {booking.payment_status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success text-white">
                      {booking.status}
                    </span>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleViewMore(booking)}
                      className="btn btn-sm btn-info text-white"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handlePay(booking._id)}
                      className="btn btn-sm btn-primary text-white"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedBooking && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Booking Details</h3>
            <p>
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p>
              <strong>Price:</strong> {selectedBooking.price}
            </p>
            <p>
              <strong>Booking Date:</strong> {selectedBooking.bookingDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedBooking.status}
            </p>
            <p>
              <strong>Payment:</strong> {selectedBooking.payment_status}
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {selectedBooking.transactionId || "N/A"}
            </p>
            <p>
              <strong>Court Type:</strong> {selectedBooking.courtType}
            </p>
            <p>
              <strong>Slot Time:</strong>{" "}
              {Array.isArray(selectedBooking.slots)
                ? selectedBooking.slots.join(", ")
                : selectedBooking.slots}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApproveBooking;
