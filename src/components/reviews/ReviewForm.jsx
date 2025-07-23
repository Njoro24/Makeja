import { useState } from 'react';
import PropTypes from 'prop-types';
import { Send } from 'lucide-react';
import StarRating from './StarRating';
import Alert from '../common/Alert';
import LoadingSpinner from '../common/LoadingSpinner';

const ReviewForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (alert) setAlert(null);
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
    if (alert) setAlert(null);
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.comment.trim()) errors.push('Review comment is required');
    if (!formData.rating) errors.push('Please select a rating');
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email))
      errors.push('Please enter a valid email');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length) {
      setAlert({ type: 'error', message: errors.join('. ') });
      return;
    }

    setSubmitting(true);
    setAlert(null);
    try {
      if (onSubmit) {
        await onSubmit({
          ...formData,
          id: Date.now(),
          date: new Date().toISOString()
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1200)); // mock
      }

      setAlert({ type: 'success', message: 'Review submitted successfully!' });
      setFormData({ name: '', email: '', rating: 0, comment: '' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-700 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">Share Your Experience</h2>

      {alert && (
        <div className="mb-4">
          <Alert {...alert} onClose={() => setAlert(null)} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            disabled={submitting}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
            Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            disabled={submitting}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-2">
            Rating *
          </label>
          <StarRating rating={formData.rating} onRate={handleRatingChange} readonly={submitting} />
        </div>

        <div>
          <label htmlFor="comment" className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
            Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your review..."
            required
            disabled={submitting}
            rows={4}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-vertical"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <LoadingSpinner size="sm" color="text-white" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
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
