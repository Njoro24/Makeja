const RoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section className="card">
      <h2 className="text-heading mb-4 text-lg">Select a Room</h2>
      <div className="grid grid-cols-2 gap-3">
        {['Single Room', 'Double Room'].map((room, idx) => (
          <button
            key={idx}
            className={`btn-primary ${selectedRoom === room ? 'ring-2 ring-purple-400' : ''}`}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
      {selectedRoom && (
        <p className="mt-4 text-sm text-purple-700">You selected: <strong>{selectedRoom}</strong></p>
      )}
    </section>
  );
};

export default RoomSelector;
