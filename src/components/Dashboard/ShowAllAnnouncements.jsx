import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ShowAllAnnouncements = () => {
  const queryClient = useQueryClient();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/announcements");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(`http://localhost:8000/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire("Deleted!", "Announcement deleted successfully.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the announcement.", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axios.patch(
        `http://localhost:8000/announcements/${id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("updated data", data);
      queryClient.invalidateQueries(["announcements"]);
      document.getElementById("update_modal").close();
      Swal.fire("Updated!", "Announcement updated successfully.", "success");
    },
    onError: (error) => {
      console.log("something went wrong", error);
      Swal.fire("Error", "Failed to update announcement.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this announcement?",
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

  const openUpdateModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    document.getElementById("update_modal").showModal();
  };

  const onSubmitUpdate = (data) => {
    updateMutation.mutate({
      id: selectedAnnouncement._id,
      updatedData: {
        title: data.title,
        message: data.message,
      },
    });
  };

  React.useEffect(() => {
    if (selectedAnnouncement) {
      reset({
        title: selectedAnnouncement.title,
        message: selectedAnnouncement.message,
      });
    }
  }, [selectedAnnouncement, reset]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg">
          Loading................
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        📢 All Announcements
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
        <table className="table table-zebra table-lg w-full">
          <thead className="bg-primary text-white text-base">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Message</th>
              <th>Posted By</th>
              <th>Posted At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{item.title}</td>
                <td>{item.message}</td>
                <td>
                  <span className="badge badge-outline badge-info">
                    {item.postedBy}
                  </span>
                </td>
                <td>
                  {new Date(item.postedAt || item.posted_at).toLocaleString()}
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openUpdateModal(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {announcements.length === 0 && (
          <p className="text-center py-6 text-gray-400">
            No announcements found.
          </p>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-xl mb-4">✏️ Update Announcement</h3>
          <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                {...register("message", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">Message is required</p>
              )}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("update_modal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ShowAllAnnouncements;
