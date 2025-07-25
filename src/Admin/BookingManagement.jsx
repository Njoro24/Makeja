import React, { useState, useEffect } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    hostel: 'all',
    dateRange: 'all',
    searchTerm: ''
  });

  const [hostels, setHostels] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API calls with mock data
    const mockBookings = [
      {
        id: 1,
        bookingId: 'BK001',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '+1234567890',
        numberOfGuests: 2,
        hostelId: 1,
        hostelName: 'Downtown Hostel',
        roomNumber: '101',
        roomType: 'Shared Dorm',
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        totalAmount: 150,
        paymentStatus: 'paid',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        specialRequests: 'Late check-in requested'
      },
      {
        id: 2,
        bookingId: 'BK002',
        guestName: 'Jane Smith',
        guestEmail: 'jane@example.com',
        guestPhone: '+0987654321',
        numberOfGuests: 1,
        hostelId: 2,
        hostelName: 'Backpacker Inn',
        roomNumber: '205',
        roomType: 'Private Room',
        checkInDate: new Date(Date.now() + 86400000).toISOString(),
        checkOutDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        totalAmount: 320,
        paymentStatus: 'pending',
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        specialRequests: null
      }
    ];

    const mockHostels = [
      { id: 1, name: 'Downtown Hostel' },
      { id: 2, name: 'Backpacker Inn' },
      { id: 3, name: 'City Center Lodge' }
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setHostels(mockHostels);
      calculateStats(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, filters]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      setBookings(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHostels = async () => {
    try {
      const response = await fetch('/api/admin/hostels');
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  const calculateStats = (bookingData) => {
    const stats = bookingData.reduce((acc, booking) => {
      acc.total++;
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, { total: 0, pending: 0, confirmed: 0, cancelled: 0, completed: 0 });
    
    setStats(stats);
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    // Filter by hostel
    if (filters.hostel !== 'all') {
      filtered = filtered.filter(booking => booking.hostelId === parseInt(filters.hostel));
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.createdAt);
        switch (filters.dateRange) {
          case 'today':
            return bookingDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return bookingDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return bookingDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.guestName?.toLowerCase().includes(searchLower) ||
        booking.guestEmail?.toLowerCase().includes(searchLower) ||
        booking.bookingId?.toLowerCase().includes(searchLower) ||
        booking.hostelName?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredBookings(filtered);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
        calculateStats(updatedBookings);
        alert('Booking status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      // For demo purposes, update locally
      const updatedBookings = bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setBookings(updatedBookings);
      calculateStats(updatedBookings);
      alert('Booking status updated successfully! (Demo mode)');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const BookingDetailsModal = ({ booking, onClose, onStatusChange }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Booking ID</label>
                  <p className="text-sm text-gray-900 font-mono">{booking.bookingId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={booking.status}
                    onChange={(e) => onStatusChange(booking.id, e.target.value)}
                    className={`text-sm px-3 py-1 rounded-md font-medium ${getStatusColor(booking.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                  <p className="text-sm text-gray-900">{booking.guestName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{booking.guestEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{booking.guestPhone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guests</label>
                  <p className="text-sm text-gray-900">{booking.numberOfGuests}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hostel</label>
                <p className="text-sm text-gray-900">{booking.hostelName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Room</label>
                <p className="text-sm text-gray-900">
                  Room {booking.roomNumber} ({booking.roomType})
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                  <p className="text-sm text-gray-900">{formatDate(booking.checkInDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                  <p className="text-sm text-gray-900">{formatDate(booking.checkOutDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                  <p className="text-lg font-semibold text-gray-900">${booking.totalAmount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                  <p className={`text-sm font-medium ${
                    booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {booking.paymentStatus?.toUpperCase()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Booking Date</label>
                <p className="text-sm text-gray-900">{formatDate(booking.createdAt)}</p>
              </div>

              {booking.specialRequests && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                  <p className="text-sm text-gray-900">{booking.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full ${color} mr-2`}></div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-2">View and manage all hostel bookings.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <StatCard title="Total Bookings" value={stats.total} color="bg-blue-500" />
          <StatCard title="Pending" value={stats.pending} color="bg-yellow-500" />
          <StatCard title="Confirmed" value={stats.confirmed} color="bg-green-500" />
          <StatCard title="Cancelled" value={stats.cancelled} color="bg-red-500" />
          <StatCard title="Completed" value={stats.completed} color="bg-gray-500" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
              <select
                value={filters.hostel}
                onChange={(e) => handleFilterChange('hostel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Hostels</option>
                {hostels.map(hostel => (
                  <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                placeholder="Search bookings..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No bookings found matching your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hostel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
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
                  {filteredBookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 font-mono">
                          {booking.bookingId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(booking.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.guestName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.guestEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.hostelName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Room {booking.roomNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          to {new Date(booking.checkOutDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${booking.totalAmount}
                        </div>
                        <div className={`text-xs ${
                          booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {booking.paymentStatus?.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(booking.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this booking?')) {
                              const updatedBookings = bookings.filter(b => b.id !== booking.id);
                              setBookings(updatedBookings);
                              calculateStats(updatedBookings);
                              alert('Booking deleted successfully! (Demo mode)');
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default BookingManagement;