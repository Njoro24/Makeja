import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bed, User, Check, X } from 'lucide-react';

const RoomCard = ({ room, selected, onSelect }) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => onSelect(room.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{room.name}</h3>
        <div className="flex items-center text-gray-600">
          <Bed className="w-4 h-4 mr-1" />
          <span className="text-sm">{room.beds} {room.beds > 1 ? 'beds' : 'bed'}</span>
        </div>
      </div>
      
      <div className="flex items-center text-gray-600 mb-3">
        <User className="w-4 h-4 mr-1" />
        <span className="text-sm">{room.capacity} {room.capacity > 1 ? 'persons' : 'person'}</span>
      </div>
      
      <ul className="space-y-1 mb-4">
        {room.amenities.slice(0, 3).map((amenity, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            {amenity}
          </li>
        ))}
        {room.amenities.length > 3 && (
          <li className="text-sm text-gray-500">+{room.amenities.length - 3} more</li>
        )}
      </ul>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="font-bold text-lg text-blue-600">Ksh {room.price.toLocaleString()}</span>
        {selected && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            Selected
          </div>
        )}
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    beds: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

// RoomSelector.jsx
import { useNavigate } from 'react-router-dom';

const RoomSelector = ({ rooms, onRoomSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    setSelectedRoom(roomId);
    onRoomSelect(room);
    navigate(`/booking/${roomId}`); // Add navigation
  };


  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Select a Room</h2>
      
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              selected={selectedRoom === room.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <X className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No rooms available</h3>
          <p className="text-gray-400">Please try different dates</p>
        </div>
      )}
    </div>
  );
};

RoomSelector.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      beds: PropTypes.number.isRequired,
      capacity: PropTypes.number.isRequired,
      amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  onRoomSelect: PropTypes.func.isRequired
};

export default RoomSelector;
