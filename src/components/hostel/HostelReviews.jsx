import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star, User } from 'lucide-react';

const ReviewItem = ({ review }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="bg-gray-100 rounded-full p-2 mr-3 w-10 h-10 flex items-center justify-center">
          <span className="font-medium text-gray-600">
            {review.user.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{review.user}</h4>
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

const HostelReviews = ({ hostelId, initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/hostels/${hostelId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating: newReview.rating,
          comment: newReview.comment
        })
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const data = await response.json();
      setReviews([data, ...reviews]);
      setShowForm(false);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews ({reviews.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({...newReview, rating: star})}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              required
              maxLength="500"
            />
            <div className="text-xs text-gray-500 text-right mt-1">
              {newReview.comment.length}/500 characters
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Submit Review'}
          </button>
        </form>
      )}

      <div>
        {reviews.length > 0 ? (
          reviews
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((review, index) => (
              <ReviewItem key={review.id || index} review={review} />
            ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

HostelReviews.propTypes = {
  hostelId: PropTypes.string.isRequired,
  initialReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      user: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HostelReviews;
