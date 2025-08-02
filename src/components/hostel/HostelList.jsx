// src/components/hostel/HostelList.jsx

import React from 'react';
import HostelCard from './HostelCard';

const HostelList = ({ hostels }) => {
  if (!hostels || hostels.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No hostels found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {hostels.map((hostel) => (
        <HostelCard key={hostel.id} hostel={hostel} />
      ))}
    </div>
  );
};

export default HostelList;
