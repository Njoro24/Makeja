import React from 'react';

const HostelAmenities = () => {
  const amenities = ['Wi-Fi', '24/7 Security', 'Hot Water', 'Laundry Service', 'Study Lounge'];

  return (
    <section className="card">
      <h3 className="text-heading mb-4 text-lg">Amenities</h3>
      <ul className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
        {amenities.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-purple-500">✔</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HostelAmenities;
