import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [stats, setStats] = useState({
    totalHostels: 12,
    totalRooms: 148,
    occupiedRooms: 92,
    totalBookings: 45,
    pendingBookings: 8,
    revenue: 12450
  });

  const [recentActivity, setRecentActivity] = useState([
    { action: 'New booking received for Sunset Hostel', timestamp: '2 hours ago', type: 'booking' },
    { action: 'Room 204 marked as available', timestamp: '4 hours ago', type: 'room' },
    { action: 'New user registered: John Doe', timestamp: '6 hours ago', type: 'user' },
    { action: 'Payment received for booking #1234', timestamp: '8 hours ago', type: 'payment' }
  ]);

  const [hostels, setHostels] = useState([
    { id: 1, name: 'Sunset Hostel', location: 'Downtown', totalRooms: 25, occupiedRooms: 18, status: 'Active' },
    { id: 2, name: 'City View Lodge', location: 'Midtown', totalRooms: 30, occupiedRooms: 22, status: 'Active' },
    { id: 3, name: 'Ocean Breeze', location: 'Coastal', totalRooms: 20, occupiedRooms: 15, status: 'Active' },
    { id: 4, name: 'Mountain View', location: 'Uptown', totalRooms: 35, occupiedRooms: 28, status: 'Active' }
  ]);

  const [rooms, setRooms] = useState([
    { id: 1, hostelId: 1, roomNumber: '101', type: 'Single', price: 25, status: 'Occupied', capacity: 1 },
    { id: 2, hostelId: 1, roomNumber: '102', type: 'Double', price: 40, status: 'Available', capacity: 2 },
    { id: 3, hostelId: 1, roomNumber: '103', type: 'Dorm', price: 15, status: 'Occupied', capacity: 6 },
    { id: 4, hostelId: 2, roomNumber: '201', type: 'Single', price: 30, status: 'Available', capacity: 1 },
    { id: 5, hostelId: 2, roomNumber: '202', type: 'Suite', price: 60, status: 'Occupied', capacity: 2 }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, guestName: 'Alice Mutiso', hostel: 'Sunset Hostel', room: '101', checkIn: '2024-08-01', checkOut: '2024-08-05', status: 'Confirmed', amount: 100 },
    { id: 2, guestName: 'Kinuthia Smith', hostel: 'City View Lodge', room: '201', checkIn: '2024-08-02', checkOut: '2024-08-04', status: 'Pending', amount: 60 },
    { id: 3, guestName: 'Carol akinyi', hostel: 'Ocean Breeze', room: '301', checkIn: '2024-08-03', checkOut: '2024-08-07', status: 'Confirmed', amount: 120 },
    { id: 4, guestName: 'David Kamau', hostel: 'Mountain View', room: '401', checkIn: '2024-08-01', checkOut: '2024-08-03', status: 'Pending', amount: 80 }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Meshack Njoroge', email: 'john@example.com', role: 'Guest', joinDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Jane Waithera', email: 'jane@example.com', role: 'Host', joinDate: '2024-02-20', status: 'Active' },
    { id: 3, name: 'Mike Sifuna', email: 'mike@example.com', role: 'Guest', joinDate: '2024-03-10', status: 'Inactive' },
    { id: 4, name: 'Sarah Wangui', email: 'sarah@example.com', role: 'Admin', joinDate: '2024-01-01', status: 'Active' }
  ]);

  const occupancyRate = stats.totalRooms > 0 ? (stats.occupiedRooms / stats.totalRooms * 100).toFixed(1) : 0;

  const occupancyData = [
    { name: 'Occupied', value: stats.occupiedRooms, color: '#ef4444' },
    { name: 'Available', value: stats.totalRooms - stats.occupiedRooms, color: '#22c55e' }
  ];

  const monthlyBookings = [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 52 },
    { month: 'Mar', bookings: 67 },
    { month: 'Apr', bookings: 58 },
    { month: 'May', bookings: 73 },
    { month: 'Jun', bookings: 81 }
  ];

  // Navigation Functions
  const navigateToView = (view) => {
    setCurrentView(view);
  };

  // CRUD Functions
  const addHostel = (hostelData) => {
    const newHostel = {
      id: hostels.length + 1,
      ...hostelData,
      totalRooms: 0,
      occupiedRooms: 0,
      status: 'Active'
    };
    setHostels([...hostels, newHostel]);
    setCurrentView('dashboard');
  };

  const addRoom = (roomData) => {
    const newRoom = {
      id: rooms.length + 1,
      ...roomData,
      status: 'Available'
    };
    setRooms([...rooms, newRoom]);
    
    // Update hostel room count
    setHostels(hostels.map(hostel => 
      hostel.id === parseInt(roomData.hostelId) 
        ? { ...hostel, totalRooms: hostel.totalRooms + 1 }
        : hostel
    ));
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  // Components
  const StatCard = ({ title, value, subtitle, color, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </div>
  );

  const Button = ({ children, onClick, color = 'blue', size = 'md', className = '' }) => {
    const baseClasses = `font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`;
    const colorClasses = {
      blue: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      green: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      red: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      gray: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500'
    };
    const sizeClasses = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  // Add New Hostel Form
  const AddHostelForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      location: '',
      description: '',
      amenities: '',
      contactEmail: '',
      contactPhone: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      addHostel(formData);
      alert('Hostel added successfully!');
    };

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Hostel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.contactPhone}
              onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="submit" color="green">Add Hostel</Button>
            <Button type="button" color="gray" onClick={() => setCurrentView('dashboard')}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  };

  // Room Management
  const RoomManagement = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRoom, setNewRoom] = useState({
      hostelId: '',
      roomNumber: '',
      type: '',
      price: '',
      capacity: ''
    });

    const handleAddRoom = (e) => {
      e.preventDefault();
      addRoom(newRoom);
      setNewRoom({ hostelId: '', roomNumber: '', type: '', price: '', capacity: '' });
      setShowAddForm(false);
      alert('Room added successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
          <Button onClick={() => setShowAddForm(!showAddForm)} color="green">
            {showAddForm ? 'Cancel' : 'Add New Room'}
          </Button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Room</h3>
            <form onSubmit={handleAddRoom} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hostel</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRoom.hostelId}
                  onChange={(e) => setNewRoom({...newRoom, hostelId: e.target.value})}
                >
                  <option value="">Select Hostel</option>
                  {hostels.map(hostel => (
                    <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRoom.type}
                  onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                >
                  <option value="">Select Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Dorm">Dorm</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ($)</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})}
                />
              </div>
              <div className="col-span-2 flex gap-4 pt-4">
                <Button type="submit" color="green">Add Room</Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">All Rooms</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => {
                  const hostel = hostels.find(h => h.id === room.hostelId);
                  return (
                    <tr key={room.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.roomNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hostel?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          room.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button size="sm" onClick={() => alert('Edit room functionality')}>Edit</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Bookings Management
  const BookingsManagement = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Bookings</h3>
            <div className="flex gap-2">
              <Button size="sm" color="green" onClick={() => alert('Export bookings')}>Export</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.guestName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.hostel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {booking.status === 'Pending' && (
                        <>
                          <Button size="sm" color="green" onClick={() => updateBookingStatus(booking.id, 'Confirmed')}>
                            Confirm
                          </Button>
                          <Button size="sm" color="red" onClick={() => updateBookingStatus(booking.id, 'Cancelled')}>
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button size="sm" onClick={() => alert('View booking details')}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // User Management
  const UserManagement = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Users</h3>
            <Button color="green" onClick={() => alert('Add new user')}>Add User</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button size="sm" onClick={() => alert('Edit user')}>Edit</Button>
                      {user.status === 'Active' ? (
                        <Button size="sm" color="red" onClick={() => updateUserStatus(user.id, 'Inactive')}>
                          Deactivate
                        </Button>
                      ) : (
                        <Button size="sm" color="green" onClick={() => updateUserStatus(user.id, 'Active')}>
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Main Dashboard View
  const DashboardView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your hostels.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Hostels"
          value={stats.totalHostels}
          color="#3b82f6"
          icon="🏢"
        />
        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          subtitle={`${occupancyRate}% occupied`}
          color="#10b981"
          icon="🏠"
        />
        <StatCard
          title="Pending Bookings"
          value={stats.pendingBookings}
          subtitle={`${stats.totalBookings} total`}
          color="#f59e0b"
          icon="📅"
        />
        <StatCard
          title="Monthly Revenue"
          value={`${stats.revenue.toLocaleString()}`}
          color="#8b5cf6"
          icon="💰"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Occupancy Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Occupancy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={occupancyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-$ksh{index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => navigateToView('add-hostel')}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 cursor-pointer"
            style={{ borderLeftColor: '#10b981' }}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3" style={{ color: '#10b981' }}>🏢</div>
              <div>
                <h3 className="font-semibold text-gray-900">Add New Hostel</h3>
                <p className="text-sm text-gray-600">Create a new hostel listing</p>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => navigateToView('rooms')}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 cursor-pointer"
            style={{ borderLeftColor: '#3b82f6' }}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3" style={{ color: '#3b82f6' }}>🏠</div>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Rooms</h3>
                <p className="text-sm text-gray-600">Add or edit room details</p>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => navigateToView('bookings')}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 cursor-pointer"
            style={{ borderLeftColor: '#f59e0b' }}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3" style={{ color: '#f59e0b' }}>📋</div>
              <div>
                <h3 className="font-semibold text-gray-900">View Bookings</h3>
                <p className="text-sm text-gray-600">Check pending bookings</p>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => navigateToView('users')}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 cursor-pointer"
            style={{ borderLeftColor: '#8b5cf6' }}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3" style={{ color: '#8b5cf6' }}>👥</div>
              <div>
                <h3 className="font-semibold text-gray-900">User Management</h3>
                <p className="text-sm text-gray-600">Manage user accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Hostel Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'booking' ? 'bg-blue-500' :
                    activity.type === 'room' ? 'bg-green-500' :
                    activity.type === 'user' ? 'bg-purple-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>

        {/* Hostels Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hostels Overview</h3>
            <button 
              onClick={() => navigateToView('hostels')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {hostels.length > 0 ? (
              hostels.slice(0, 4).map((hostel) => (
                <div key={hostel.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{hostel.name}</p>
                    <p className="text-sm text-gray-500">{hostel.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {hostel.occupiedRooms}/{hostel.totalRooms}
                    </p>
                    <p className="text-xs text-gray-500">occupied</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No hostels found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation Bar
  const NavBar = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigateToView('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigateToView('hostels')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'hostels' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hostels
            </button>
            <button
              onClick={() => navigateToView('rooms')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'rooms' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => navigateToView('bookings')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'bookings' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => navigateToView('users')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'users' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin Panel</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Hostels Overview Page
  const HostelsOverview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">All Hostels</h2>
        <Button onClick={() => navigateToView('add-hostel')} color="green">Add New Hostel</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((hostel) => (
          <div key={hostel.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{hostel.name}</h3>
                <p className="text-sm text-gray-600">{hostel.location}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                hostel.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {hostel.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Rooms:</span>
                <span className="font-medium">{hostel.totalRooms}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Occupied:</span>
                <span className="font-medium">{hostel.occupiedRooms}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Occupancy Rate:</span>
                <span className="font-medium">
                  {hostel.totalRooms > 0 ? (hostel.occupiedRooms / hostel.totalRooms * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" onClick={() => alert('Edit hostel')}>Edit</Button>
              <Button size="sm" color="gray" onClick={() => navigateToView('rooms')}>View Rooms</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Main render logic
  const renderCurrentView = () => {
    switch (currentView) {
      case 'add-hostel':
        return <AddHostelForm />;
      case 'rooms':
        return <RoomManagement />;
      case 'bookings':
        return <BookingsManagement />;
      case 'users':
        return <UserManagement />;
      case 'hostels':
        return <HostelsOverview />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-6 pb-6">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default AdminDashboard;