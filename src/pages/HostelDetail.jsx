import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { BASE_API } from '../utils/constants';


const HostelDetail = () => {
  const { id } = useParams();
  const { data: hostel, loading, error, fetchData } = useApi();

  useEffect(() => {
    fetchData(`${BASE_API}/hostels/${id}`);
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {loading && <p>Loading hostel details...</p>}
      {error && <p className="text-red-500">Failed to load hostel details.</p>}
      {!loading && !error && hostel && <HostelDetails hostel={hostel} />}
    </div>
  );
};

export default HostelDetail;