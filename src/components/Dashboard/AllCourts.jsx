// import React, { useContext } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { AuthContext } from "../../contextApi/AuthContext";
// import Swal from "sweetalert2";

// const AllCourts = () => {
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   console.log(user.email);
//   const {
//     data: courts = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["userCourts", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(
//         `https://sports-club-management-server.vercel.app/adminCourts?email=${user?.email}`
//       );
//       return res.data;
//     },
//   });

//   // Delete court mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       console.log(id);
//       console.log(user?.email);

//       return await axios.delete(
//         `https://sports-club-management-server.vercel.app/courts/${id}?email=${user.email}`
//       );
//     },
//     onSuccess: () => {
//       Swal.fire("Deleted!", "Court has been removed.", "success");
//       queryClient.invalidateQueries(["userCourts"]);
//     },
//     onError: () => {
//       Swal.fire("Error", "Failed to delete court", "error");
//     },
//   });

//   const handleDelete = (id) => {
//     console.log(id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This court will be deleted permanently.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(id);
//       }
//     });
//   };

//   const handleUpdate = (court) => {
//     Swal.fire(
//       "Coming Soon",
//       "Update functionality will be added later",
//       "info"
//     );
//     // Or redirect to edit page: navigate(`/dashboard/editCourt/${court._id}`)
//   };

//   if (isLoading) return <p>Loading your courts...</p>;
//   if (isError) return <p>Failed to load courts.</p>;

//   return (
//     <div className="overflow-x-auto mt-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">My Created Courts</h2>
//       <table className="table w-full">
//         <thead className="bg-base-200 text-base font-semibold text-center">
//           <tr>
//             <th>#</th>
//             <th>Image</th>
//             <th>Type</th>
//             <th>Slot Times</th>
//             <th>Price (৳)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           {courts.map((court, index) => (
//             <tr key={court._id}>
//               <td>{index + 1}</td>
//               <td>
//                 <img
//                   src={court.image}
//                   alt={court.type}
//                   className="w-16 h-16 rounded object-cover mx-auto"
//                 />
//               </td>
//               <td>{court.type}</td>
//               <td className="text-sm">{court.slot}</td>
//               <td>{court.price}</td>
//               <td className="space-x-2">
//                 <button
//                   className="btn btn-sm btn-warning"
//                   onClick={() => handleUpdate(court._id)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="btn btn-sm btn-error"
//                   onClick={() => handleDelete(court._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllCourts;

import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../contextApi/AuthContext";
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
        `https://sports-club-management-server.vercel.app/adminCourts?email=${user?.email}`
      );
      return res.data;
    },
  });

  console.log(courts);

  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(
        `https://sports-club-management-server.vercel.app/courts/${id}?email=${user.email}`
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

  if (isLoading) return <p>Loading your courts...</p>;
  if (isError) return <p>Failed to load courts.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Created Courts</h2>
      <table className="table w-full">
        <thead className="bg-base-200 text-base font-semibold text-center">
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
                  <div className="grid grid-cols-1 gap-1">
                    {court.slots.map((slot, i) => (
                      <div
                        key={i}
                        className="border px-2 py-1 rounded bg-base-200 text-sm"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                ) : (
                  court.slots
                )}
              </td>
              <td>{court.price}</td>
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
