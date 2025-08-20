import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../contextApi/AuthContext";
import { useMutation } from "@tanstack/react-query";

const AddCourts = () => {
  const { register, handleSubmit, reset } = useForm();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const { user } = useContext(AuthContext);

  const { mutate: addCourt, isPending } = useMutation({
    mutationFn: async (courtData) => {
      const res = await axios.post("http://localhost:8000/courts", courtData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Court added successfully", "success");
      reset();
      setUploadedImageUrl(null);
    },
    onError: () => {
      Swal.fire("Error", "Failed to add court", "error");
    },
  });

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) {
      Swal.fire("Error", "Please wait until the image uploads", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this court?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const courtData = {
        image: uploadedImageUrl,
        type: data.type,
        slots: data.slots,
        price: parseFloat(data.price),
        created_by: user.email,
      };

      addCourt(courtData);
      console.log(courtData);
    } else {
      Swal.fire("Cancelled", "Court not added", "info");
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbb_image}`,
        formData
      );
      const url = res.data.data.url;
      setUploadedImageUrl(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  const slotTimes = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];

  return (
    <div className="max-w-xl border-2 mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Court</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Court Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Court Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full input input-bordered"
            onChange={handleImageUpload}
            required
          />
        </div>

        {/* Court Type */}
        <div>
          <label className="block mb-1 font-medium">Court Type</label>
          <select
            {...register("type", { required: true })}
            className="w-full select select-bordered"
          >
            <option value="">Select court type</option>
            <option value="Tennis">Tennis</option>
            <option value="Badminton">Badminton</option>
            <option value="Squash">Squash</option>
          </select>
        </div>

        {/* Multiple Slot Time Selection */}
        <div>
          <label className="block mb-1 font-medium">Select Slot Times</label>
          <div className="grid grid-cols-2 gap-2">
            {slotTimes.map((slot, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={slot}
                  {...register("slots", { required: true })}
                  className="checkbox checkbox-primary"
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">
            Price per Session (৳)
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Enter price"
            className="w-full input input-bordered"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Court"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourts;
