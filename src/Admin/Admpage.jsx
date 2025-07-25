import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalHostels: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    pendingBookings: 0,
    revenue: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard statistics
      const statsResponse = await fetch('/api/admin/stats');
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch recent activity
      const activityResponse = await fetch('/api/admin/recent-activity');
      const activityData = await activityResponse.json();
      setRecentActivity(activityData);

      // Fetch hostels for quick overview
      const hostelsResponse = await fetch('/api/admin/hostels/overview');
      const hostelsData = await hostelsResponse.json();
      setHostels(hostelsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

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

  const QuickAction = ({ title, description, link, color, icon, onClick }) => (
    <div 
      onClick={onClick}
      className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 cursor-pointer"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center">
        <div className="text-2xl mr-3" style={{ color }}>{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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
            value={`$${stats.revenue.toLocaleString()}`}
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
            <QuickAction
              title="Add New Hostel"
              description="Create a new hostel listing"
              onClick={() => alert('Navigate to Add Hostel')}
              color="#10b981"
              icon="+"
            />
            <QuickAction
              title="Manage Rooms"
              description="Add or edit room details"
              onClick={() => alert('Navigate to Room Management')}
              color="#3b82f6"
              icon="🏠"
            />
            <QuickAction
              title="View Bookings"
              description="Check pending bookings"
              onClick={() => alert('Navigate to Bookings')}
              color="#f59e0b"
              icon="📋"
            />
            <QuickAction
              title="User Management"
              description="Manage user accounts"
              onClick={() => alert('Navigate to User Management')}
              color="#8b5cf6"
              icon="👥"
            />
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
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
                onClick={() => alert('Navigate to All Hostels')}
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
    </div>
  );
};

export default AdminDashboard;