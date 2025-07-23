// src/components/hostel/HostelCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
// import placeholderImage from '../../assets/images/placeholders/hostel-placeholder.jpg';

const HostelCard = ({ hostel }) => {
  const {
    id,
    name,
    location,
    pricePerNight,
    imageUrl,
    rating,
  } = hostel;

  return (
    <Link to={`/hostels/${id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-200">
      <img
        src={imageUrl || placeholderImage}
        alt={name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <span className="text-base text-primary font-bold">{formatCurrency(pricePerNight)} / night</span>
          {rating && (
            <span className="text-sm text-yellow-500">⭐ {rating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HostelCard;
