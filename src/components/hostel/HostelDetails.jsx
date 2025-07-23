import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Wifi, Utensils, Shield, Droplet, Tv, Users } from 'lucide-react';

const HostelDetails = ({ hostel }) => {
  const amenitiesIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    food: <Utensils className="w-5 h-5" />,
    security: <Shield className="w-5 h-5" />,
    laundry: <Droplet className="w-5 h-5" />,
    tv: <Tv className="w-5 h-5" />,
    shared: <Users className="w-5 h-5" />
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-3xl font-bold text-gray-800">{hostel.name}</h1>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="w-5 h-5 mr-1" />
          <span>{hostel.location}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            ⭐ {hostel.rating} ({hostel.reviewsCount} reviews)
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Description</h2>
          <p className="text-gray-600 mb-6">{hostel.description}</p>
          
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {hostel.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                {amenitiesIcons[amenity.toLowerCase()] || <Wifi className="w-5 h-5" />}
                <span className="ml-2 text-gray-700 capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Pricing</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Single Room:</span>
              <span className="font-medium">Ksh {hostel.prices.single.toLocaleString()}/month</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shared Room:</span>
              <span className="font-medium">Ksh {hostel.prices.shared.toLocaleString()}/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deposit:</span>
              <span className="font-medium">Ksh {hostel.prices.deposit.toLocaleString()}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-800">Rules</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {hostel.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

HostelDetails.propTypes = {
  hostel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
    prices: PropTypes.shape({
      single: PropTypes.number.isRequired,
      shared: PropTypes.number.isRequired,
      deposit: PropTypes.number.isRequired
    }).isRequired,
    rules: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default HostelDetails;
