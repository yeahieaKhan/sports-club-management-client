// import React, { useContext, useState } from "react";
// import {
//   useQuery,
//   useMutation,
//   QueryClient,
//   useQueryClient,
// } from "@tanstack/react-query";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../contextApi/AuthContext";

// const PendingBooking = () => {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const {
//     data: bookings = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["pendingBookings", user?.email],
//     enabled: !!user?.email, // Prevents running before user is loaded
//     queryFn: async () => {
//       const res = await axios.get(
//         `https://sports-club-management-server.vercel.app/pending/bookingStatus?email=${user.email}`
//       );
//       return res.data;
//     },
//   });

//   console.log(bookings);

//   // delete booking
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axios.delete(`https://sports-club-management-server.vercel.app/bookings/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("Deleted!", "Booking has been deleted.", "success");
//       queryClient.invalidateQueries({ queryKey: ["pendingBookings"] });
//     },
//     onError: (erro) => {
//       console.log(erro);
//       Swal.fire("Error!", "Something went wrong!", "error");
//     },
//   });

//   if (isLoading) return <p>Loading pending bookings...</p>;
//   if (isError) return <p>Error fetching bookings.</p>;

//   const handleViewMore = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     console.log(id);
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

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Pending Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No pending bookings found.</p>
//       ) : (
//         <table className="table-auto w-full border">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="p-2 border">User Email</th>
//               <th className="p-2 border">price</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id} className="border-b">
//                 <td className="p-2 border">{booking.email}</td>
//                 <td className="p-2 border">{booking.price}</td>
//                 <td className="p-2 border">{booking.bookingDate}</td>
//                 <td className="p-2 border">
//                   {" "}
//                   <span className="bg-green-700 px-3 py-1 rounded-2xl text-white">
//                     {booking.status}
//                   </span>{" "}
//                 </td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => handleDelete(booking._id)}
//                   >
//                     Cancel Booking
//                   </button>
//                   <button
//                     className="btn btn-info"
//                     onClick={() => handleViewMore(booking)}
//                   >
//                     View More
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {showModal && selectedBooking && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-2">Booking Details</h3>
//             <p>
//               <strong>Email:</strong> {selectedBooking.email}
//             </p>
//             <p>
//               <strong>Price:</strong> {selectedBooking.price}
//             </p>
//             <p>
//               <strong>Booking Date:</strong> {selectedBooking.bookingDate}
//             </p>
//             <p>
//               <strong>Status:</strong> {selectedBooking.status}
//             </p>
//             <p>
//               <strong>Booking At:</strong>{" "}
//               {new Date(selectedBooking.booking_at).toLocaleDateString(
//                 "en-GB",
//                 {
//                   day: "2-digit",
//                   month: "long",
//                   year: "numeric",
//                 }
//               )}
//             </p>
//             <p>
//               <div>
//                 <strong>Slot:</strong>
//                 {selectedBooking.slots && selectedBooking.slots.length > 0 ? (
//                   <ul className="list-disc list-inside ml-4">
//                     {selectedBooking.slots.map((slot, index) => (
//                       <li key={index}>{slot}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>N/A</p>
//                 )}
//               </div>
//             </p>

//             <div className="modal-action">
//               <button className="btn" onClick={() => setShowModal(false)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default PendingBooking;

import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contextApi/AuthContext";

const PendingBooking = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://sports-club-management-server.vercel.app/pending/bookingStatus?email=${user.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `https://sports-club-management-server.vercel.app/bookings/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Booking has been deleted.", "success");
      queryClient.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong!", "error");
    },
  });

  const handleViewMore = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return (
      <p className="text-center py-6 text-lg">Loading pending bookings...</p>
    );
  if (isError)
    return (
      <p className="text-center py-6 text-red-600">Error fetching bookings.</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        📋 Pending Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No pending bookings found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="table w-full">
            <thead className="bg-primary text-white  font-semibold">
              <tr>
                <th>Email</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-base-100 transition-all"
                >
                  <td>{booking.email}</td>
                  <td>৳{booking.price}</td>
                  <td>{booking.bookingDate}</td>
                  <td>
                    <span className="badge badge-success">
                      {booking.status}
                    </span>
                  </td>
                  <td className="space-x-2 gap-1">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleViewMore(booking)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && selectedBooking && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3 text-primary">
              📝 Booking Details
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedBooking.email}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ৳
                {selectedBooking.price}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {selectedBooking.bookingDate}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedBooking.status}
              </p>
              <p>
                <span className="font-semibold">Booked At:</span>{" "}
                {new Date(selectedBooking.booking_at).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
              <div>
                <span className="font-semibold">Slots:</span>
                {selectedBooking.slots && selectedBooking.slots.length > 0 ? (
                  <ul className="list-disc list-inside ml-4">
                    {selectedBooking.slots.map((slot, index) => (
                      <li key={index}>{slot}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">N/A</p>
                )}
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingBooking;
