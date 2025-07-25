import React, { useState, useEffect } from 'react';

const RoomManagement = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all hostels
  useEffect(() => {
    fetchHostels();
  }, []);

  // Fetch rooms when hostel is selected
  useEffect(() => {
    if (selectedHostel) {
      fetchRooms(selectedHostel.id);
    }
  }, [selectedHostel]);

  const fetchHostels = async () => {
    try {
      const response = await fetch('/api/admin/hostels');
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  const fetchRooms = async (hostelId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/hostels/${hostelId}/rooms`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const AddRoomForm = ({ onSubmit, onCancel, room = null }) => {
    const [formData, setFormData] = useState({
      roomNumber: room?.roomNumber || '',
      type: room?.type || 'single',
      capacity: room?.capacity || 1,
      price: room?.price || '',
      description: room?.description || '',
      amenities: room?.amenities || [],
      status: room?.status || 'available',
      floor: room?.floor || '',
      size: room?.size || ''
    });

    const roomTypes = ['single', 'double', 'triple', 'quad', 'dormitory'];
    const roomStatuses = ['available', 'occupied', 'maintenance', 'cleaning'];
    const roomAmenities = [
      'Private Bathroom', 'Shared Bathroom', 'Air Conditioning', 'Fan', 
      'Desk', 'Wardrobe', 'Window', 'Balcony', 'TV', 'Mini Fridge'
    ];

    const handleInputChange = (e) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || 0 : value
      }));
    };

    const handleAmenityToggle = (amenity) => {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };

    const handleSubmit = () => {
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {room ? 'Edit Room' : 'Add New Room'}
              </h3>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number *
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 101, A-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor
                  </label>
                  <input
                    type="text"
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Ground, 1st, 2nd"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Size (sq ft)
                  </label>
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {roomStatuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Room description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roomAmenities.map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {room ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAddRoom = async (roomData) => {
    try {
      const response = await fetch(`/api/admin/hostels/${selectedHostel.id}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
      
      if (response.ok) {
        const newRoom = await response.json();
        setRooms([...rooms, newRoom]);
        setShowAddRoomForm(false);
        alert('Room added successfully!');
      }
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Error adding room. Please try again.');
    }
  };

  const handleUpdateRoom = async (roomData) => {
    try {
      const response = await fetch(`/api/admin/rooms/${editingRoom.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
      
      if (response.ok) {
        const updatedRoom = await response.json();
        setRooms(rooms.map(r => r.id === editingRoom.id ? updatedRoom : r));
        setEditingRoom(null);
        alert('Room updated successfully!');
      }
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Error updating room. Please try again.');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    
    try {
      const response = await fetch(`/api/admin/rooms/${roomId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setRooms(rooms.filter(r => r.id !== roomId));
        alert('Room deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Error deleting room. Please try again.');
    }
  };

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/rooms/${roomId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        setRooms(rooms.map(r => r.id === roomId ? { ...r, status: newStatus } : r));
        alert('Room status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating room status:', error);
      alert('Error updating room status. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'cleaning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage rooms for your hostels.</p>
        </div>

        {/* Hostel Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Hostel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostels.map(hostel => (
              <div
                key={hostel.id}
                onClick={() => setSelectedHostel(hostel)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedHostel?.id === hostel.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900">{hostel.name}</h3>
                <p className="text-sm text-gray-600">{hostel.location}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {hostel.totalRooms || 0} rooms
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Room Management Section */}
        {selectedHostel && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Rooms for {selectedHostel.name}
                </h2>
                <p className="text-sm text-gray-600">{rooms.length} rooms total</p>
              </div>
              <button
                onClick={() => setShowAddRoomForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add New Room
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading rooms...</p>
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No rooms found. Add the first room to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map(room => (
                      <tr key={room.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Room {room.roomNumber}
                            </div>
                            {room.floor && (
                              <div className="text-sm text-gray-500">
                                Floor: {room.floor}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900 capitalize">
                            {room.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {room.capacity} person{room.capacity > 1 ? 's' : ''}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            ${room.price}/night
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={room.status}
                            onChange={(e) => handleStatusChange(room.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(room.status)}`}
                          >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="cleaning">Cleaning</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingRoom(room)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteRoom(room.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Room Form Modal */}
        {showAddRoomForm && (
          <AddRoomForm
            onSubmit={handleAddRoom}
            onCancel={() => setShowAddRoomForm(false)}
          />
        )}

        {/* Edit Room Form Modal */}
        {editingRoom && (
          <AddRoomForm
            room={editingRoom}
            onSubmit={handleUpdateRoom}
            onCancel={() => setEditingRoom(null)}
          />
        )}
      </div>
    </div>
  );
};

export default RoomManagement;