

import React, { useState, useEffect } from 'react';
import HostelList from '../components/hostel/HostelList';
import HostelFilters from '../components/hostel/HostelFilters';
import HostelMap from '../components/hostel/HostelMap';
import useApi from '../hooks/useApi';
import { getHostels } from '../services/hostel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Alert from '../components/common/Alert';

const HostelSearch = () => {
  const { data: hostels, error, loading, fetchData } = useApi(getHostels);
  const [filteredHostels, setFilteredHostels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredHostels(hostels);
  }, [hostels]);

  const handleFilter = (filters) => {
    const filtered = hostels.filter((hostel) => {
      const matchesLocation = filters.location
        ? hostel.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesPrice = filters.maxPrice
        ? hostel.pricePerNight <= filters.maxPrice
        : true;
      return matchesLocation && matchesPrice;
    });
    setFilteredHostels(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Ideal Hostel</h1>

      <HostelFilters onFilter={handleFilter} />

      {loading && <LoadingSpinner />}
      {error && <Alert type="error" message="Failed to fetch hostels." />}

      {!loading && !error && (
        <>
          <HostelList hostels={filteredHostels} />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Map View</h2>
            <HostelMap hostels={filteredHostels} />
          </div>
        </>
      )}
    </div>
  );
};

export default HostelSearch;
