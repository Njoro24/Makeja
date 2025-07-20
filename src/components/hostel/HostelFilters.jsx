import React from 'react';

const HostelFilters = ({ onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <select
        className="p-2 rounded-lg border border-gray-300"
        onChange={(e) => onFilterChange('location', e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Thika">Thika</option>
      </select>
      <select
        className="p-2 rounded-lg border border-gray-300"
        onChange={(e) => onFilterChange('price', e.target.value)}
      >
        <option value="">Any Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
};

export default HostelFilters;
