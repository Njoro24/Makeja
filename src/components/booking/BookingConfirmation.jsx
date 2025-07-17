import React from 'react';

const BookingConfirmation = () => {
  return (
    <section className="card text-center">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-2">🎉 Booking Confirmed!</h2>
      <p className="text-gray-600">Thank you for booking with us. A confirmation email has been sent to your inbox.</p>
      <button className="btn-primary mt-4">View Booking Details</button>
    </section>
  );
};

export default BookingConfirmation;
