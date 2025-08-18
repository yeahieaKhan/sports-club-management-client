import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contextApi/AuthContext";
import { useNavigate } from "react-router";

const ApproveBooking = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  console.log(user.email);

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedBookings"],
    queryFn: async () => {
      const res = await axios.get(
        `https://sports-club-management-server.vercel.app/approved/booking?email=${user.email}`
      );
      return res.data;
    },
  });

  console.log(bookings);

  const handleViewMore = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handlePay = (id) => {
    console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };

  if (isLoading) {
    return <div className="text-center mt-10 font-semibold">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Failed to load approved bookings.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">✅ Approved Bookings</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Court Type</th>
              <th className="px-4 py-2 border">Booking Date</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{booking.email}</td>
                  <td className="px-4 py-2 border">{booking.courtType}</td>
                  <td className="px-4 py-2 border">{booking.bookingDate}</td>
                  <td className="px-4 py-2 border">{booking.price}</td>
                  <td className="px-4 py-2 border">
                    <span className="bg-red-700 rounded text-white p-2 ">
                      {booking.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="bg-green-600  rounded text-white p-2 ">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleViewMore(booking)}
                      className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                    >
                      View More
                    </button>
                    <button
                      onClick={() => handlePay(booking._id)}
                      className="px-2 py-1 text-sm bg-primary text-white rounded"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No bookings found for
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal from PendingBooking */}
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
              <strong>Payment:</strong> {selectedBooking.payment || "N/A"}
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {selectedBooking.transactionId || "N/A"}
            </p>
            <p>
              <strong>Court Type:</strong> {selectedBooking.courtType}
            </p>
            <p>
              <strong>Slot Time:</strong> {selectedBooking.slots}
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

// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ApproveBooking = () => {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const queryClient = useQueryClient();

//   const {
//     data: bookings = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["approvedBookings"],
//     queryFn: async () => {
//       const res = await axios.get("https://sports-club-management-server.vercel.app/bookings/approved");
//       return res.data;
//     },
//   });
//   console.log(bookings);

//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axios.delete(`https://sports-club-management-server.vercel.app/bookings/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("Deleted!", "Booking has been deleted.", "success");
//       queryClient.invalidateQueries(["approvedBookings"]);
//     },
//     onError: () => {
//       Swal.fire("Error!", "Something went wrong!", "error");
//     },
//   });

//   const handleViewMore = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This booking will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(id);
//       }
//     });
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10 font-semibold">Loading...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center mt-10 text-red-500 font-semibold">
//         Failed to load approved bookings.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">✅ Approved Bookings</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border border-gray-300">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="px-4 py-2 border">#</th>
//               <th className="px-4 py-2 border">User Email</th>
//               <th className="px-4 py-2 border">Court Type</th>
//               <th className="px-4 py-2 border">Slot Time</th>
//               <th className="px-4 py-2 border">Booking Date</th>
//               <th className="px-4 py-2 border">Price</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking, index) => (
//               <tr key={booking._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border">{index + 1}</td>
//                 <td className="px-4 py-2 border">{booking.email}</td>
//                 <td className="px-4 py-2 border">{booking.courtType}</td>
//                 <td className="px-4 py-2 border">{booking.slotTime}</td>
//                 <td className="px-4 py-2 border">{booking.bookingDate}</td>
//                 <td className="px-4 py-2 border">{booking.price}</td>
//                 <td className="px-4 py-2 border text-green-600 font-medium">
//                   {booking.status}
//                 </td>
//                 <td className="px-4 py-2 border space-x-2">
//                   <button
//                     onClick={() => handleViewMore(booking)}
//                     className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
//                   >
//                     View More
//                   </button>
//                   <button
//                     onClick={() => handleDelete(booking._id)}
//                     className="px-2 py-1 text-sm bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && selectedBooking && (
//         <dialog
//           open
//           className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center"
//         >
//           <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
//             <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
//             <p>
//               <strong>User:</strong> {selectedBooking.email}
//             </p>
//             <p>
//               <strong>Court Type:</strong> {selectedBooking.courtType}
//             </p>
//             <p>
//               <strong>Slot Time:</strong> {selectedBooking.slotTime}
//             </p>
//             <p>
//               <strong>Booking Date:</strong> {selectedBooking.bookingDate}
//             </p>
//             <p>
//               <strong>Price:</strong> {selectedBooking.price}
//             </p>
//             <p>
//               <strong>Status:</strong> {selectedBooking.status}
//             </p>
//             <p>
//               <strong>Payment:</strong> {selectedBooking.payment || "N/A"}
//             </p>
//             <p>
//               <strong>Transaction ID:</strong>{" "}
//               {selectedBooking.transactionId || "N/A"}
//             </p>
//             <div className="mt-4 text-right">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-700 text-white rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default ApproveBooking;
