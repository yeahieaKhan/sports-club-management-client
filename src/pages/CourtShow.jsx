import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contextApi/AuthContext";

const CourtShow = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState("");

  const {
    data: courtsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: () =>
      axios
        .get("https://sports-club-management-server.vercel.app/courts")
        .then((res) => res.data),
  });

  console.log(courtsData);
  const openModal = (court) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedCourt(court);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourt(null);
    setSelectedSlots([]);
    setBookingDate("");
  };

  const handleSlotChange = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleBookingSubmit = async () => {
    if (!bookingDate || selectedSlots.length === 0) {
      return Swal.fire("Error", "Please select date and slots!", "error");
    }

    const totalPrice = selectedSlots.length * selectedCourt.price;

    const bookingInfo = {
      courtId: selectedCourt._id,
      courtType: selectedCourt.type,
      image: selectedCourt.image,
      slots: selectedSlots,
      bookingDate,
      price: totalPrice,
      email: user.email,
      name: user.displayName,
      status: "pending",
      booking_at: new Date().toISOString(),
    };
    console.log(bookingInfo);
    try {
      const res = await axios.post(
        "https://sports-club-management-server.vercel.app/bookings",
        bookingInfo
      );
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire("Success", "Court booked successfully!", "success");
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Booking failed",
        "error"
      );
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

  if (isLoading) return <p>Loading courts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid max-w-7xl py-20 mx-auto grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {courtsData.map((court) => (
        <div key={court._id} className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={court.image}
              alt={court.type}
              className="w-full h-56 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{court.type}</h2>
            <p>Price: {court.price} ৳ per slot</p>
            <button
              onClick={() => openModal(court)}
              className="btn btn-primary mt-2"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}

      {user && isModalOpen && selectedCourt && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-3">
              Book {selectedCourt.type}
            </h3>
            <img
              src={selectedCourt.image}
              alt={selectedCourt.type}
              className="w-full h-48 object-cover rounded"
            />
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Info */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block mb-1">Court Type</label>
                  <input
                    value={selectedCourt.type}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Price Per Slot</label>
                  <input
                    value={selectedCourt.price}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Slots */}
              <div className="mt-4">
                <label className="block mb-1">Select Slots</label>
                <div className="grid grid-cols-2 gap-2">
                  {slotTimes.map((slot, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={slot}
                        checked={selectedSlots.includes(slot)}
                        onChange={() => handleSlotChange(slot)}
                        className="checkbox checkbox-primary"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Booking Date */}
              <div className="mt-4">
                <label className="block mb-1">Booking Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Total Price */}
              <div className="mt-4">
                <p>
                  <strong>Total Price:</strong>{" "}
                  {selectedSlots.length * selectedCourt.price} ৳
                </p>
              </div>

              {/* Buttons */}
              <div className="modal-action">
                <button
                  onClick={handleBookingSubmit}
                  type="button"
                  className="btn btn-primary"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CourtShow;
