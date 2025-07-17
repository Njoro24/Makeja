import React from 'react';

function HostelList({ hostels }) {
  if (!hostels || hostels.length === 0) {
    return <p>No hostels found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {hostels.map((hostel) => (
        <div key={hostel.id} className="bg-white rounded-xl shadow p-4">
          <h3 className="text-xl font-semibold">{hostel.name}</h3>
          <p className="text-gray-600">{hostel.location}</p>
          <p className="text-sm text-gray-500">{hostel.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HostelList;
