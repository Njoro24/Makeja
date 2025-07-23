
import React, { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";
import { createBooking } from "../../services/booking";
import { formatPrice } from "../../utils/helpers";

const BookingConfirmation = () => {
  const { selectedRoom, bookingDates, user } = useContext(BookingContext);

  const handleConfirm = async () => {
    await createBooking({
      roomId: selectedRoom.id,
      userId: user.id,
      checkIn: bookingDates.checkIn,
      checkOut: bookingDates.checkOut,
    });
    alert("Booking confirmed!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
      <p><strong>Room:</strong> {selectedRoom?.name}</p>
      <p><strong>Location:</strong> {selectedRoom?.location}</p>
      <p><strong>Check-in:</strong> {bookingDates.checkIn}</p>
      <p><strong>Check-out:</strong> {bookingDates.checkOut}</p>
      <p><strong>Total:</strong> {formatPrice(selectedRoom?.price)}</p>

      <button
        onClick={handleConfirm}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingConfirmation;
