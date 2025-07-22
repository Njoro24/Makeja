import StarRating from './StarRating';
import PropTypes from 'prop-types';

const ReviewCard = ({ review, className = '' }) => {
  
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
  
  if (!review) return null;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {review.name || 'Anonymous'}
          </h3>
          <div className="mt-1">
            <StarRating rating={review.rating || 0} readonly size="sm" />
          </div>
        </div>
        <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
          {formatDate(review.date)}
        </span>
      </div>
      
      {review.comment && (
        <p className="text-gray-700 leading-relaxed break-words">
          {review.comment}
        </p>
      )}
      
      {review.verified && (
        <div className="mt-3 flex items-center gap-1">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Verified Purchase
          </span>
        </div>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
    verified: PropTypes.bool
  }).isRequired,
  className: PropTypes.string
};

export default ReviewCard;