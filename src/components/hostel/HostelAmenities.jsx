import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const HostelAmenities = ({ amenities }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Amenities</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenities.map((a, i) => (
          <li key={i} className="flex gap-2 items-center text-gray-700">
            <CheckCircle2 className="text-purple-600 w-5 h-5" />
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostelAmenities;
