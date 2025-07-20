
import React from 'react';

const HostelCard = ({ hostel }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-sm w-full">
      <img
        src={hostel.image}
        alt={hostel.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="text-lg font-semibold text-gray-800">{hostel.name}</div>
      <p className="text-sm text-gray-600">{hostel.location}</p>
      <div className="mt-2 text-sm text-gray-800">Ksh {hostel.price} / month</div>
    </div>
  );
};

export default HostelCard;
