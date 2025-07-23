import React, { useEffect, useState, useContext } from "react";
import { getUserBookings } from "../../services/booking";
import { BookingContext } from "../../context/BookingContext";
import BookingCard from "./BookingCard";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(BookingContext);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getUserBookings(user.id);
      setBookings(data);
    };
    fetchBookings();
  }, [user.id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no past bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
