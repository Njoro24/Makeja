import { useState } from 'react';
import ReviewCard from './ReviewCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { Star, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

const ReviewList = ({ 
  reviews = [], 
  loading = false, 
  itemsPerPage = 6,
  className = '',
  showLoadMore = true 
}) => {
  const [displayedReviews, setDisplayedReviews] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setDisplayedReviews(prev => Math.min(prev + itemsPerPage, reviews.length));
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <LoadingSpinner size="lg" text="Loading reviews..." />
        
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-500">Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  const hasMoreReviews = displayedReviews < reviews.length;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        {reviews.slice(0, displayedReviews).map((review, index) => (
          <ReviewCard 
            key={review.id || `review-${index}`} 
            review={review} 
          />
        ))}
      </div>
      
      {showLoadMore && hasMoreReviews && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            <ChevronDown className="w-4 h-4" />
            Load More Reviews ({reviews.length - displayedReviews} remaining)
          </button>
        </div>
      )}
      
      {!hasMoreReviews && reviews.length > itemsPerPage && (
        <div className="text-center text-gray-500 text-sm py-4">
          Showing all {reviews.length} reviews
        </div>
      )}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      rating: PropTypes.number,
      comment: PropTypes.string,
      date: PropTypes.string,
      verified: PropTypes.bool
    })
  ),
  loading: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  className: PropTypes.string,
  showLoadMore: PropTypes.bool
};

export default ReviewList;