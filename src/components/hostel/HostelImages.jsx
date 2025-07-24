import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const HostelImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {images.slice(0, 4).map((img, index) => (
          <div 
            key={index}
            className={`cursor-pointer ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img 
              src={img.thumbnail} 
              alt={`Hostel thumbnail ${index + 1}`}
              className="w-full h-24 object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative">
        <img
          src={images[currentIndex].full}
          alt={`Hostel view ${currentIndex + 1}`}
          className="w-full h-80 md:h-96 object-cover rounded-lg cursor-pointer"
          onClick={() => setIsViewerOpen(true)}
        />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isViewerOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsViewerOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-4xl w-full">
            <img
              src={images[currentIndex].full}
              alt={`Hostel view ${currentIndex + 1}`}
              className="max-h-[80vh] w-full object-contain"
            />
            
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

HostelImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
      full: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HostelImages;
