// HostelDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HostelDetails from './HostelDetails';
import HostelImages from './HostelImages';
import HostelReviews from './HostelReviews';
import HostelAmenities from './HostelAmenities';

const HostelDetail = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        // Simulated API call
        const response = await fetch(`/api/hostels/${id}`);
        const data = await response.json();
        setHostel(data);
      } catch (err) {
        setError('Failed to load hostel details.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [id]);

  if (loading) return <p>Loading hostel details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {hostel && (
        <>
          <HostelDetails hostel={hostel} />
          <HostelImages images={hostel.images} />
          <HostelAmenities amenities={hostel.amenities} />
          <HostelReviews reviews={hostel.reviews} />
        </>
      )}
    </div>
  );
};

export default HostelDetail;
