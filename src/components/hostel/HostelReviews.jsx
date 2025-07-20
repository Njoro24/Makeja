import React from 'react';

const HostelReviews = ({ reviews }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">{r.name}</span>
              <span className="text-yellow-500 font-semibold">{r.rating}★</span>
            </div>
            <p className="text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelReviews;
