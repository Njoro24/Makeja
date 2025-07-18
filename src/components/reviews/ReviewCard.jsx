import StarRating from './StarRating';
import PropTypes from 'prop-types';

const ReviewCard = ({ review, className = '' }) => {
  // Format date if it's a valid date string
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };