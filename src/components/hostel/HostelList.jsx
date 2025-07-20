import React from 'react';
import HostelCard from './HostelCard';

const HostelList = ({ hostels, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {hostels.map((hostel) => (
        <HostelCard key={hostel.id} hostel={hostel} onClick={() => onSelect(hostel)} />
      ))}
    </div>
  );
};

export default HostelList
