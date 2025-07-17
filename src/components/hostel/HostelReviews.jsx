import React from 'react';

const HostelReviews = () => {
  const reviews = [
    { name: 'Jane D.', comment: 'Great location and clean rooms!' },
    { name: 'Mike K.', comment: 'Affordable and safe, would recommend.' },
  ];

  return (
    <section className="card">
      <h3 className="text-heading mb-4 text-lg">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-md shadow-sm">
            <p className="text-sm text-gray-700 italic">"{review.comment}"</p>
            <p className="text-xs text-right text-purple-600 mt-1">- {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HostelReviews;