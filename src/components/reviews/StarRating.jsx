import { Star } from 'lucide-react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ 
  rating = 0, 
  onRate = null, 
  readonly = false, 
  size = 'md',
  maxRating = 5,
  className = ''
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const sizeClasses = { 
    sm: 'w-4 h-4', 
    md: 'w-5 h-5', 
    lg: 'w-6 h-6' 
  };

  const handleClick = (star) => {
    if (!readonly && onRate) {
      onRate(star);
    }
  };

  const handleMouseEnter = (star) => {
    if (!readonly) {
      setHoveredRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0);
    }
  };

  const handleKeyDown = (e, star) => {
    if (!readonly && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick(star);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={(e) => handleKeyDown(e, star)}
          className={`${
            readonly 
              ? 'cursor-default' 
              : 'cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded'
          } transition-transform`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
      {readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  onRate: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  maxRating: PropTypes.number,
  className: PropTypes.string
};

export default StarRating;