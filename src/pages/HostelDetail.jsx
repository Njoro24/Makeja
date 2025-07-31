// HostelDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HostelDetails from './HostelDetails';
import HostelImages from './HostelImages';
import HostelReviews from './HostelReviews';
import HostelAmenities from './HostelAmenities';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'lucide-react';

const HostelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/hostels/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Hostel not found');
          }
          throw new Error('Failed to load hostel details');
        }
        const data = await response.json();
        setHostel(data);
      } catch (err) {
        setError(err.message || 'Failed to load hostel details.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2" /> Back to hostels
      </button>
    </div>
  );
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2" /> Back to hostels
      </button>
      
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

HostelDetail.propTypes = {
  id: PropTypes.string
};

export default HostelDetail;
