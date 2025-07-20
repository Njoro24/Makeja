import React from "react";
import HostelImages from "./HostelImages";
import HostelAmenities from "./HostelAmenities";
import HostelReviews from "./HostelReviews";

const HostelDetails = ({ hostel }) => {
  return (
    <div className="bg-[#12121A] text-white py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Available Hostels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {hostel.map((hostelItem) => (
          <div
            key={hostelItem.id}
            className="bg-[#1D1D2C] rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <HostelImages images={hostelItem.images} name={hostelItem.name} />
            <h3 className="text-xl font-bold mt-4">{hostelItem.name}</h3>
            <HostelAmenities amenities={hostelItem.amenities} />
            <HostelReviews reviews={hostelItem.reviews} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelDetails;
