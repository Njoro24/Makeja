// src/components/hostel/HostelFilters.jsx
import React, { useState } from 'react';

const HostelFilters = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState([]);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((a) => a !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ location, price: Number(price), amenities });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md border border-navy">
      <div className="mb-4">
        <label className="block text-navy font-medium mb-1">Location</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Nairobi"
        />
      </div>

      <div className="mb-4">
        <label className="block text-navy font-medium mb-1">Max Price (Ksh)</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g., 15000"
        />
      </div>

      <div className="mb-4">
        <label className="block text-navy font-medium mb-1">Amenities</label>
        <div className="flex flex-wrap gap-3">
          {['WiFi', 'Laundry', 'Cafeteria', 'Security'].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={item}
                checked={amenities.includes(item)}
                onChange={handleAmenityChange}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-navy text-white px-4 py-2 rounded hover:bg-navy/90 transition"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default HostelFilters;
