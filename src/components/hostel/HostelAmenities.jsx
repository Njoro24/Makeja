import React from 'react';
import PropTypes from 'prop-types';
import {
  Wifi,
  Utensils,
  Shield,
  Droplet,
  Tv,
  Users,
  Home,
  ParkingSquare,
  Dumbbell,
  BookOpen,
  Sun,
  Snowflake
} from 'lucide-react';

const amenityIcons = {
  wifi: <Wifi className="w-5 h-5 text-blue-500" />,
  food: <Utensils className="w-5 h-5 text-orange-500" />,
  security: <Shield className="w-5 h-5 text-green-500" />,
  laundry: <Droplet className="w-5 h-5 text-purple-500" />,
  tv: <Tv className="w-5 h-5 text-red-500" />,
  shared: <Users className="w-5 h-5 text-indigo-500" />,
  private: <Home className="w-5 h-5 text-teal-500" />,
  parking: <ParkingSquare className="w-5 h-5 text-gray-500" />,
  gym: <Dumbbell className="w-5 h-5 text-yellow-500" />,
  study: <BookOpen className="w-5 h-5 text-blue-500" />,
  ac: <Snowflake className="w-5 h-5 text-cyan-500" />,
  fan: <Sun className="w-5 h-5 text-yellow-400" />
};

const HostelAmenities = ({ amenities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="mr-3">
              {amenityIcons[amenity.toLowerCase()] || <Wifi className="w-5 h-5 text-blue-500" />}
            </div>
            <span className="text-gray-700 capitalize">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

HostelAmenities.propTypes = {
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default HostelAmenities;
