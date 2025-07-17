import React from 'react';

const HostelImages = () => {
  return (
    <section className="card">
      <h2 className="text-heading mb-4">Hostel Images</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-purple-100 h-32 rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="flex items-center justify-center h-full text-purple-400 font-medium">
              Image {i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HostelImages;