

import React, { useState } from 'react';
import Button from '../common/Button';

const HostelFilters = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ location, maxPrice: Number(maxPrice) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-end"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          placeholder="e.g., Nairobi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Price (Ksh)
        </label>
        <input
          type="number"
          placeholder="e.g., 5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full md:w-auto">
        Apply Filters
      </Button>
    </form>
  );
};

export default HostelFilters;
