import React from "react";

const HostelImages = ({ images, name }) => {
  return (
    <img
      src={images[0]} // Use first image as preview
      alt={`${name} preview`}
      className="w-full h-52 object-cover rounded-md border border-gray-700"
    />
  );
};

export default HostelImages;
