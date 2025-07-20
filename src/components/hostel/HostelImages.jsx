import React from 'react';

const HostelImages = ({ images }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery ${i+1}`}
            className="rounded-lg shadow-sm object-cover h-56 w-full hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default HostelImages;
