import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Home, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusConfig = {
  confirmed: {
    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    color: 'text-green-600'
  },
  cancelled: {
    icon: <XCircle className="w-4 h-4 text-red-500" />,
    color: 'text-red-600'
  },
  pending: {
    icon: <Clock className="w-4 h-4 text-yellow-500" />,
    color: 'text-yellow-600'
  }
};

const BookingItem = ({ booking }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{booking.hostelName}</h3>
        <div className={`flex items-center ${statusConfig[booking.status].color}`}>
          {statusConfig[booking.status].icon}
          <span className="ml-1 text-sm capitalize">{booking.status}</span>
        </div>
      </div>
      
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{booking.location}</span>
      </div>
      
      <div className="flex items-center text-gray-600 text-sm mb-3">
        <Calendar className="w-4 h-4 mr-1" />
        <span>{booking.checkIn} - {booking.checkOut}</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-500">Amount:</span>
          <span className="ml-2 font-medium">Ksh {booking.amount.toLocaleString()}</span>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

BookingItem.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hostelName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['confirmed', 'cancelled', 'pending']).isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired
};

const BookingHistory = ({ bookings }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Booking History</h2>
      
      {bookings.length > 0 ? (
        <div>
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Home className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No bookings yet</h3>
          <p className="text-gray-400">Your upcoming bookings will appear here</p>
        </div>
      )}
    </div>
  );
};

BookingHistory.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      hostelName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BookingHistory;
