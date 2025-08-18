import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../contextApi/AuthContext";

const slotTimes = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

const UpdateCourtModal = ({ court, onClose, refetch }) => {
  const [type, setType] = useState(court.type);
  const [slot, setSlot] = useState(court.slot || []);
  const [price, setPrice] = useState(court.price);
  const [imageFile, setImageFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSlotChange = (time) => {
    if (slot.includes(time)) {
      setSlot(slot.filter((s) => s !== time));
    } else {
      setSlot([...slot, time]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = court.image;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imbb_image
          }`,
          formData
        );
        imageUrl = imgRes.data.data.url;
      }

      const updatedData = {
        type,
        price: parseFloat(price),
        image: imageUrl,
        slots: slot,
      };

      await axios.patch(
        `https://sports-club-management-server.vercel.app/courts/${court._id}?email=${user.email}`,
        updatedData
      );

      Swal.fire("Updated!", "Court updated successfully!", "success");
      refetch();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update court.", "error");
    }
  };

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <form onSubmit={handleSubmit} method="dialog" className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Court</h3>

        {/* Court Type */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Court Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select court type</option>
            <option>Tennis</option>
            <option>Badminton</option>
            <option>Squash</option>
          </select>
        </div>

        {/* Multi Slot Selection */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Select Slot(s)</label>
          <div className="grid grid-cols-2 gap-2">
            {slotTimes.map((time, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={slot.includes(time)}
                  onChange={() => handleSlotChange(time)}
                  className="checkbox checkbox-primary"
                />
                <span>{time}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            Update Changes
          </button>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default UpdateCourtModal;
