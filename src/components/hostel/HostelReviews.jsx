import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const HostelReviews = ({ reviews: initialReviews, hostelId, onFetchReviews }) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [loading, setLoading] = useState(!initialReviews);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const getMockReviews = (hostelId) => {
    return [
      {
        id: 1,
        user: "Sarah Johnson",
        rating: 4.5,
        date: "2024-01-15",
        comment: "Great location and friendly staff. The rooms were clean and comfortable. Would definitely stay here again!"
      },
      {
        id: 2,
        user: "Mike Chen",
        rating: 5.0,
        date: "2024-01-10",
        comment: "Amazing hostel! Perfect for backpackers. Great common areas and the kitchen facilities are excellent."
      },
      {
        id: 3,
        user: "Emma Wilson",
        rating: 4.0,
        date: "2024-01-08",
        comment: "Good value for money. The location is convenient and the atmosphere is very welcoming."
      }
    ];
  };

  useEffect(() => {
    if (!initialReviews && hostelId) {
      const fetchReviews = async () => {
        try {
          setLoading(true);
          setError(null);

          // If a custom fetch function is provided, use it
          if (onFetchReviews && typeof onFetchReviews === 'function') {
            const fetchedReviews = await onFetchReviews(hostelId);
            setReviews(fetchedReviews);
          } else {
            // Simulate API call with mock data
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockReviews = getMockReviews(hostelId);
            setReviews(mockReviews);
          }
        } catch (err) {
          console.error('Error fetching reviews:', err);
          setError(err.message || 'Failed to fetch reviews');
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [hostelId, initialReviews, onFetchReviews]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading reviews...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">⚠️</span>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {reviews.length > 0 && (
          <div className="text-right">
            <div className="text-lg font-semibold">{averageRating}/5</div>
            <div className="text-sm text-gray-600">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</div>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id || review.user} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm">
                    {review.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <span className="font-semibold text-gray-900">{review.user}</span>
                    <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 text-4xl mb-4">💬</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

HostelReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    })
  ),
  hostelId: PropTypes.string.isRequired,
  onFetchReviews: PropTypes.func
};

HostelReviews.defaultProps = {
  reviews: null,
  onFetchReviews: null
};

export default HostelReviews;