import React from "react";

const HostelAmenities = ({ amenities }) => {
  return (
    <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
      {amenities.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
