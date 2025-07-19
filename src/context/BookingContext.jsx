import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    hostel: null,
    checkIn: null,
    checkOut: null,
    guests: 1,
    roomType: null,
    total: 0,
  });

  // Setters with logic
  const setCheckIn = (date) => {
    setBookingDetails((prev) => ({ ...prev, checkIn: date }));
  };

  const setCheckOut = (date) => {
    setBookingDetails((prev) => ({ ...prev, checkOut: date }));
  };

  const setGuests = (count) => {
    setBookingDetails((prev) => ({ ...prev, guests: count }));
  };

  const setHostel = (hostel) => {
    setBookingDetails((prev) => ({ ...prev, hostel }));
  };

  const setRoomType = (roomType) => {
    setBookingDetails((prev) => ({ ...prev, roomType }));
  };

  const calculateTotal = (pricePerNight) => {
    const start = new Date(bookingDetails.checkIn);
    const end = new Date(bookingDetails.checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const total = nights * pricePerNight;
    setBookingDetails((prev) => ({ ...prev, total }));
    return total;
  };

  const resetBooking = () => {
    setBookingDetails({
      hostel: null,
      checkIn: null,
      checkOut: null,
      guests: 1,
      roomType: null,
      total: 0,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingDetails,
        setCheckIn,
        setCheckOut,
        setGuests,
        setHostel,
        setRoomType,
        calculateTotal,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
