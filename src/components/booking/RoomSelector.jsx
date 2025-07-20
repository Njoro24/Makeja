import React, { useEffect, useState, useContext } from "react";
import { fetchAvailableRooms } from "../../services/hostel";
import HostelCard from "../hostel/HostelCard";
import { BookingContext } from "../../context/BookingContext";

const RoomSelector = () => {
  const [rooms, setRooms] = useState([]);
  const { setSelectedRoom } = useContext(BookingContext);

  useEffect(() => {
    const loadRooms = async () => {
      const data = await fetchAvailableRooms(); // from Fancy's hostel.js
      setRooms(data);
    };
    loadRooms();
  }, []);

  const handleSelect = (room) => {
    setSelectedRoom(room); // Save in booking context
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Select a Room</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <HostelCard
            key={room.id}
            hostel={room}
            onSelect={() => handleSelect(room)}
            showSelectButton
          />
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;
