      
                import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const HostelReviews = ({ hostelId, initialReviews = [], className = '' }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
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
          ...formData,
          verified: true // Assuming verified if they're logged in
        })
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const data = await response.json();
      setReviews([data, ...reviews]);
      setShowForm(false);
    } catch (err) {
      setError({ 
        type: 'error', 
        message: err.message || 'Failed to submit review' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews ({reviews.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          {showForm ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {showForm && (
        <ReviewForm 
          onSubmit={handleSubmit} 
          className="mb-8"
          initialRating={5}
        />
      )}

      {error && (
        <div className="mb-4">
          <Alert {...error} onClose={() => setError(null)} />
        </div>
      )}

      <ReviewList 
        reviews={reviews}
        loading={isLoading}
        className="mt-6"
      />
    </div>
  );
};

HostelReviews.propTypes = {
  hostelId: PropTypes.string.isRequired,
  initialReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      rating: PropTypes.number,
      comment: PropTypes.string,
      date: PropTypes.string,
      verified: PropTypes.bool
    })
  ),
  className: PropTypes.string
};

HostelReviews.defaultProps = {
  initialReviews: [],
  className: ''
};

export default HostelReviews;
