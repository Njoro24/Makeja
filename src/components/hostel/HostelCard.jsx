import React from 'react';

const HostelCard = ({ hostel, onClick }) => {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white w-full max-w-sm m-4 cursor-pointer" onClick={onClick}>
      <img
        src={hostel.image}
        alt={hostel.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{hostel.name}</h2>
        <p className="text-gray-600">{hostel.location}</p>
      </div>
    </div>
  );
};

export default HostelCard;
