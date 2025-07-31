      
            import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from '../services/api';
import { API_ENDPOINTS } from '../services/api';

const HostelReviews = ({ reviews: initialReviews, hostelId }) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [loading, setLoading] = useState(!initialReviews);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialReviews) {
      const fetchReviews = async () => {
        try {
          setLoading(true);
          const response = await get(API_ENDPOINTS.HOSTEL_REVIEWS(hostelId));
          
          if (response.success) {
            setReviews(response.data);
          } else {
            throw new Error(response.error?.message || 'Failed to fetch reviews');
          }
        } catch (err) {
          console.error('Error fetching reviews:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [hostelId, initialReviews]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{review.user}</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-500">⭐ {review.rating}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

HostelReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    })
  ),
  hostelId: PropTypes.string.isRequired
};

export default HostelReviews;
