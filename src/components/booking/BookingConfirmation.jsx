import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, Calendar, Clock, User, Home, MapPin } from 'lucide-react';

const BookingConfirmation = ({ booking, hostel }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-green-100">Your booking reference: #{booking.id}</p>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Booking Details</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Check-in / Check-out</p>
              <p className="font-medium">
                {booking.checkIn} - {booking.checkOut}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{booking.duration} months</p>
            </div>
          </div>

          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Guest</p>
              <p className="font-medium">{booking.guestName}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Hostel Information</h2>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <Home className="w-5 h-5 text-gray-500 mr-3" />
            <h3 className="text-lg font-medium">{hostel.name}</h3>
          </div>
          
          <div className="flex items-center mb-2">
            <MapPin className="w-5 h-5 text-gray-500 mr-3" />
            <p className="text-gray-600">{hostel.location}</p>
          </div>
          
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-600">Room Type:</span>
            <span className="font-medium capitalize">{booking.roomType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-medium text-green-600">Ksh {booking.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">What's next?</h3>
          <p className="text-blue-600 text-sm">
            We've sent a confirmation email with all the details. The hostel will contact you shortly 
            to arrange check-in. Please bring your ID and this reference number when you arrive.
          </p>
        </div>
      </div>
    </div>
  );
};

BookingConfirmation.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    guestName: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired
  }).isRequired,
  hostel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired
};

export default BookingConfirmation;

