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

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="bg-gray-100 rounded-full p-2 mr-3">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{review.user}</h4>
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired
  }).isRequired
};

const HostelReviews = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new review object
    const newReviewObj = {
      user: "Current User", // In a real app, this would be the logged-in user's name
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      comment: newReview.comment
    };
    // Add the new review to the list
    setReviews([...reviews, newReviewObj]);
    // Reset form and hide
    setShowForm(false);
    setNewReview({ rating: 5, comment: '' });
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
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </form>
      )}

      <div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>
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
  ).isRequired
};

export default HostelReviews;
