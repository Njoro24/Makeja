import React from 'react';

const BookingHistory = () => {
  const bookings = [
    { hostel: 'Hostel A', date: 'Jan 2024' },
    { hostel: 'Hostel B', date: 'Feb 2024' },
  ];

  return (
    <section className="card">
      <h2 className="text-heading mb-4">Your Booking History</h2>
      <ul className="space-y-3">
        {bookings.map((booking, index) => (
          <li
            key={index}
            className="p-3 bg-purple-50 rounded-lg flex justify-between items-center shadow-sm"
          >
            <span className="font-medium text-purple-700">{booking.hostel}</span>
            <span className="text-sm text-gray-500">{booking.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BookingHistory;
