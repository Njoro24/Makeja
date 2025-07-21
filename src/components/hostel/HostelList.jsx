// src/components/hostel/HostelList.jsx
import React from 'react';
import HostelCard from './HostelCard';

const HostelList = ({ hostels }) => {
  const handleHostelClick = (id) => {
    // Future: Navigate to hostel details page
    console.log('Selected hostel ID:', id);
  };

  return (
    <div className="grid gap-4">
      {hostels.length === 0 ? (
        <p className="text-navy">No hostels match your criteria.</p>
      ) : (
        hostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} onClick={handleHostelClick} />
        ))
      )}
    </div>
  );
};

export default HostelList;
