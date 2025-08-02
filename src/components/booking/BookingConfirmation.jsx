import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Home, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button'; // Assuming you have a Button component

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, hostel } = location.state || {};

  // Handle case where data isn't passed via state
  if (!booking || !hostel) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Booking Information Not Found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't retrieve your booking details. Please check your bookings or contact support.
        </p>
        <Button 
          onClick={() => navigate('/home')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden print:shadow-none">
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:block p-4 border-b">
        <h1 className="text-xl font-bold">Booking Confirmation</h1>
        <p className="text-sm text-gray-500">Reference: #{booking.id}</p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white text-center print:bg-green-500">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 print:text-white" />
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-green-100 print:text-white">Your booking reference: #{booking.id}</p>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Home
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            Print Confirmation
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Booking Details</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Check-in / Check-out</p>
              <p className="font-medium">
                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{booking.duration} {booking.duration > 1 ? 'months' : 'month'}</p>
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
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 print:border print:border-gray-200">
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
          
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-medium text-green-600">Ksh {booking.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 print:border print:border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">What's next?</h3>
          <p className="text-blue-600 text-sm">
            We've sent a confirmation email with all the details. The hostel will contact you shortly 
            to arrange check-in. Please bring your ID and this reference number when you arrive.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 print:hidden">
          <button
            onClick={() => navigate(`/hostels/${hostel.id}`)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors flex-1"
          >
            View Hostel Again
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-1"
          >
            View My Bookings
          </button>
        </div>
      </div>

      {/* Print Footer - Only visible when printing */}
      <div className="hidden print:block p-4 border-t text-center text-sm text-gray-500">
        <p>Thank you for booking with us!</p>
        <p>Contact: support@makeja.co.ke | Phone: +254 700 123 456</p>
      </div>
    </div>
  );
};

BookingConfirmation.propTypes = {
  // Removed PropTypes since we're using location.state
};

export default BookingConfirmation;
