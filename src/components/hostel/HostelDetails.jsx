import React from 'react';

const HostelDetails = ({ hostel }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8 mt-8">
      <h1 className="text-3xl font-semibold text-purple-800 mb-2">{hostel.name}</h1>
      <p className="text-gray-700 mb-1">{hostel.location}</p>
      <p className="text-xl font-bold text-purple-600 mb-4">Ksh {hostel.price} / mo</p>
      <p className="text-gray-600 leading-relaxed">{hostel.description}</p>
    </div>
  );
};

export default HostelDetails;
