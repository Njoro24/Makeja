import React, { useState } from "react";

const HostelReviews = ({ reviews }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((index + 1) % reviews.length);
  const handlePrev = () => setIndex((index - 1 + reviews.length) % reviews.length);

  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between items-center">
        <button onClick={handlePrev} className="text-gray-400 hover:text-white">◀</button>
        <div className="text-center text-sm">
          <div className="flex justify-center">
            <img
              src={reviews[index].avatar}
              alt="Reviewer"
              className="h-12 w-12 rounded-full object-cover border border-gray-600"
            />
          </div>
          <p className="italic mt-2">"{reviews[index].comment}"</p>
          <p className="text-yellow-400">{"⭐️".repeat(reviews[index].rating)}</p>
        </div>
        <button onClick={handleNext} className="text-gray-400 hover:text-white">▶</button>
      </div>
    </div>
  );
};

export default HostelReviews;
