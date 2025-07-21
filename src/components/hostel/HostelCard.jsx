// src/components/hostel/HostelCard.jsx
import React from 'react';

const HostelCard = ({ hostel, onClick }) => {
  return (
    <div
      className="bg-white border border-navy rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer"
      onClick={() => onClick(hostel.id)}
    >
      <img
        src={hostel.image || '/images/placeholder-hostel.jpg'}
        alt={hostel.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-semibold text-navy">{hostel.name}</h3>
      <p className="text-sm text-gray-600">{hostel.location}</p>
      <p className="text-navy font-medium mt-2">Ksh {hostel.price} / month</p>
      <div className="mt-2 text-sm text-gray-500">
        {hostel.amenities?.slice(0, 3).join(', ')}
        {hostel.amenities?.length > 3 && '...'}
      </div>
    </div>
  );
};

export default HostelCard;
