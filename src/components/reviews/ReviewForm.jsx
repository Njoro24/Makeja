import { useState } from 'react';
import StarRating from './StarRating';
import Alert from '../common/Alert';
import LoadingSpinner from '../common/LoadingSpinner';
import { Send } from 'lucide-react';
import PropTypes from 'prop-types';

const ReviewForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear alert when user starts typing
    if (alert) setAlert(null);
  };

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
    if (alert) setAlert(null);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.comment.trim()) errors.push('Review comment is required');
    if (!formData.rating) errors.push('Please select a rating');
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setAlert({ 
        type: 'error', 
        message: errors.join('. ') 
      });
      return;
    }

    setSubmitting(true);
    setAlert(null);

    try {
      // If onSubmit prop is provided, use it, otherwise simulate submission
      if (onSubmit) {
        await onSubmit({
          ...formData,
          id: Date.now(), // Simple ID generation
          date: new Date().toISOString()
        });
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setAlert({ 
        type: 'success', 
        message: 'Review submitted successfully! Thank you for your feedback.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', rating: 0, comment: '' });
      
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: 'Failed to submit review. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white p-6 border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Share Your Experience</h2>
      
      {alert && (
        <div className="mb-4">
          <Alert {...alert} onClose={() => setAlert(null)} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <StarRating 
            rating={formData.rating} 
            onRate={handleRatingChange}
            readonly={submitting}
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your experience..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
            required
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
        >
          {submitting ? (
            <>
              <LoadingSpinner size="sm" color="text-white" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string
};

export default ReviewForm;