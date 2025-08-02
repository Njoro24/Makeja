import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Heart, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  User, 
  Search,
  Bell,
  CreditCard,
  Home,
  Settings,
  BookOpen
} from 'lucide-react';

const Dashboard = () => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  const [bookedHostels, setBookedHostels] = useState([]);
  const [favoriteHostels, setFavoriteHostels] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingStays: 0,
    favoriteHostels: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          const userData = JSON.parse(storedUser);
          
          setAuthState({
            user: userData,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);
  
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }
  
  const currentUser = {
    name: authState.user?.full_name || 
          authState.user?.name || 
          (authState.user?.first_name && authState.user?.last_name ? 
            `${authState.user.first_name} ${authState.user.last_name}` : null) ||
          authState.user?.username || 
          'Guest User',
    email: authState.user?.email || 'guest@email.com',
    profileImage: authState.user?.profile_picture || authState.user?.profileImage || null
  };

  const getDaysUntilCheckIn = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntilRentDue = (rentDueDate) => {
    const today = new Date();
    const dueDate = new Date(rentDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-900/30 text-green-400 border-green-800';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-800';
      case 'cancelled':
        return 'bg-red-900/30 text-red-400 border-red-800';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  const removeFavorite = (hostelId) => {
    setFavoriteHostels(prev => prev.filter(hostel => hostel.id !== hostelId));
    setStats(prev => ({ ...prev, favoriteHostels: prev.favoriteHostels - 1 }));
  };

  const handleBrowseHostels = () => {
    alert('Navigate to Browse Hostels page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Makeja</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {currentUser.profileImage ? (
                    <img 
                      src={currentUser.profileImage} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-300">{currentUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-400">Your student accommodation dashboard</p>
          {!authState.isAuthenticated && (
            <div className="mt-2 p-3 bg-yellow-900/30 border border-yellow-800 rounded-lg">
              <p className="text-yellow-400 text-sm">
                ⚠️ You appear to be not logged in. Please check your authentication.
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active Stays</p>
                <p className="text-2xl font-bold text-white">{stats.upcomingStays}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Favorites</p>
                <p className="text-2xl font-bold text-white">{favoriteHostels.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-white">KSh {stats.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booked Hostels */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
              <div className="px-6 py-4 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Your Bookings</h3>
              </div>
              <div className="p-6">
                {bookedHostels.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">No bookings yet</h4>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Start your student journey by finding the perfect accommodation near your campus
                    </p>
                    <button 
                      onClick={handleBrowseHostels}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Browse Hostels
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bookedHostels.map((hostel) => (
                      <div key={hostel.id} className="border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors">
                        <div className="flex items-start space-x-4">
                          <img
                            src={hostel.image}
                            alt={hostel.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-white">{hostel.name}</h4>
                                <div className="flex items-center text-sm text-gray-400 mt-1">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {hostel.location}
                                </div>
                                <div className="flex items-center mt-2">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-400 ml-1">{hostel.rating}</span>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(hostel.status)}`}>
                                {hostel.status}
                              </span>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Check-in</p>
                                <p className="font-medium text-white">{new Date(hostel.checkIn).toLocaleDateString()}</p>
                                <p className="text-xs text-gray-500">
                                  {getDaysUntilCheckIn(hostel.checkIn) > 0 
                                    ? `${getDaysUntilCheckIn(hostel.checkIn)} days to go`
                                    : 'Check-in today!'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Monthly Rent</p>
                                <p className="font-medium text-white">KSh {hostel.monthlyRent?.toLocaleString()}</p>
                              </div>
                            </div>

                            <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-800 rounded-lg">
                              <div className="flex items-center">
                                <CreditCard className="w-4 h-4 text-yellow-400 mr-2" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-yellow-400">
                                    Monthly Rent Due: {new Date(hostel.rentDue).toLocaleDateString()}
                                  </p>
                                  <p className="text-xs text-yellow-500">
                                    {getDaysUntilRentDue(hostel.rentDue) > 0 
                                      ? `Payment due in ${getDaysUntilRentDue(hostel.rentDue)} days`
                                      : 'Payment overdue!'}
                                  </p>
                                </div>
                                <span className="text-lg font-bold text-white">KSh {hostel.monthlyRent?.toLocaleString()}/month</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleBrowseHostels}
                  className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-gray-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Search className="w-4 h-4 mr-3" />
                  Search Hostels
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-gray-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <Calendar className="w-4 h-4 mr-3" />
                  View Calendar
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-gray-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Payment History
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-gray-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <User className="w-4 h-4 mr-3" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Favorite Hostels */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Favorite Hostels</h3>
              {favoriteHostels.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 mb-4">No favorites yet</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Heart hostels while browsing to save them here
                  </p>
                  <button 
                    onClick={handleBrowseHostels}
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Browse Hostels →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteHostels.map((hostel) => (
                    <div key={hostel.id} className="flex items-center space-x-3 p-3 border border-slate-700 rounded-lg hover:bg-slate-700/30">
                      <img
                        src={hostel.image}
                        alt={hostel.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{hostel.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center text-xs text-gray-400">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{hostel.location}</span>
                          </div>
                          <button
                            onClick={() => removeFavorite(hostel.id)}
                            className="text-purple-400 hover:text-red-400 transition-colors"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-400 ml-1">{hostel.rating}</span>
                          </div>
                          <span className="text-xs font-medium text-white">KSh {hostel.monthlyRent?.toLocaleString()}/month</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Student Resources */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Student Resources</h3>
              <p className="text-sm text-gray-300 mb-4">
                Tips and guides for student accommodation
              </p>
              <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                View Resources →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;