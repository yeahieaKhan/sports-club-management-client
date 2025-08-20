import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contextApi/AuthContext";

const MakeAnnouncement = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:8000/announcements",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("announced", data);
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire("Success!", "Announcement posted!", "success");
      reset();
    },
    onError: (error) => {
      console.log("some went wrong", error);
      Swal.fire("Error", "Failed to post announcement", "error");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const anouncementInfo = {
      title: data.title,
      message: data.message,
      postedBy: user?.email || "admin@sportsclub.com",
      posted_at: new Date().toISOString(),
    };
    mutateAsync(anouncementInfo);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="bg-base-100 shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            📣 Make an Announcement
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Let your club members know what's happening.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="label font-medium text-base">📌 Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter announcement title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="label font-medium text-base">📝 Message</label>
            <textarea
              className="textarea textarea-bordered w-full resize-none"
              rows={5}
              placeholder="Write your announcement message here..."
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && (
              <p className="text-error text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Post Announcement 🚀"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
