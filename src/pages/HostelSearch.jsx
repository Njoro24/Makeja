// src/pages/HostelSearch.jsx
import React, { useState, useEffect } from 'react';
import HostelFilters from '../components/hostel/HostelFilters';
import HostelList from '../components/hostel/HostelList';
import HostelMap from '../components/hostel/HostelMap';
import { getHostels } from '../services/hostel';
import '../styles/custom.css';

const HostelSearch = () => {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getHostels();
      setHostels(data);
      setFilteredHostels(data);
    }
    fetchData();
  }, []);

  const handleFilter = (filters) => {
    const result = hostels.filter((hostel) => {
      return (
        (!filters.location || hostel.location.includes(filters.location)) &&
        (!filters.price || hostel.price <= filters.price) &&
        (!filters.amenities || filters.amenities.every(a => hostel.amenities.includes(a)))
      );
    });
    setFilteredHostels(result);
  };

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold text-navy mb-4">Search Hostels</h1>
      <HostelFilters onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <HostelList hostels={filteredHostels} />
        <HostelMap hostels={filteredHostels} />
      </div>
    </div>
  );
};

export default HostelSearch;
