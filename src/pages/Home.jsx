import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SearchBar from '../components/common/SearchBar';
import { toast } from 'react-toastify';

function Home() {
  const { isAuthenticated, user } = useAuth();
  const [featuredHostels, setFeaturedHostels] = useState([]);
  const [stats, setStats] = useState({
    totalHostels: 0,
    totalUsers: 0,
    totalBookings: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock featured hostels data
        const mockHostels = [
          {
            id: 1,
            name: "Sunrise Student Lodge",
            location: "Nairobi",
            price: 8000,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
            gender: "mixed",
            rooms: 2,
            amenities: ["WiFi", "Security", "Parking"]
          },
          {
            id: 2,
            name: "Queens Hostel",
            location: "Mombasa",
            price: 6500,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
            gender: "female",
            rooms: 1,
            amenities: ["WiFi", "Kitchen", "Laundry"]
          },
          {
            id: 3,
            name: "Campus View Hostel",
            location: "Kisumu",
            price: 5500,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
            gender: "male",
            rooms: 3,
            amenities: ["WiFi", "Study Room", "Security"]
          },
          {
            id: 4,
            name: "Modern Living Hostel",
            location: "Nakuru",
            price: 7200,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
            gender: "mixed",
            rooms: 2,
            amenities: ["WiFi", "Gym", "Parking", "Kitchen"]
          }
        ];
        
        setFeaturedHostels(mockHostels);
        setStats({
          totalHostels: 150,
          totalUsers: 1200,
          totalBookings: 890,
          averageRating: 4.6
        });
        
      } catch (error) {
        toast.error('Failed to load home data');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleSearch = (filters) => {
    navigate('/hostels', { state: { filters } });
  };

  const handleBookNow = (hostelId) => {
    if (!isAuthenticated) {
      toast.info('Please login to book a hostel');
      navigate('/login');
      return;
    }
    navigate(`/hostel/${hostelId}/book`);
  };

  const handleViewDetails = (hostelId) => {
    navigate(`/hostel/${hostelId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Hostel
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover comfortable, affordable student accommodation across Kenya. 
            {isAuthenticated ? ` Welcome back, ${user?.firstName}!` : ' Join thousands of students who found their home away from home.'}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stats.totalHostels}+
              </div>
              <div className="text-gray-600">Hostels Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stats.totalUsers}+
              </div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {stats.totalBookings}+
              </div>
              <div className="text-gray-600">Successful Bookings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {stats.averageRating}⭐
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Hostels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular hostels, carefully selected for their quality, location, and student reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredHostels.map((hostel) => (
              <div
                key={hostel.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-semibold">
                    ⭐ {hostel.rating}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      hostel.gender === 'male' ? 'bg-blue-100 text-blue-800' :
                      hostel.gender === 'female' ? 'bg-pink-100 text-pink-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {hostel.gender === 'male' ? '👨 Male' : 
                       hostel.gender === 'female' ? '👩 Female' : 
                       '👥 Mixed'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {hostel.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hostel.location}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21h2m-2 0H3m2 0h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v12" />
                    </svg>
                    {hostel.rooms} Room{hostel.rooms > 1 ? 's' : ''}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hostel.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      KSH {hostel.price.toLocaleString()}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(hostel.id)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBookNow(hostel.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/hostels"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              View All Hostels
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced for logged-in users */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {isAuthenticated ? 'Your Makeja Experience' : 'Why Choose Makeja?'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isAuthenticated 
                ? 'Access all features and manage your hostel experience seamlessly'
                : 'Everything you need to find and book the perfect student accommodation'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isAuthenticated ? (
              // Enhanced features for logged-in users
              <>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
                  <p className="text-gray-600 mb-4">View and manage all your current and past bookings</p>
                  <Link to="/bookings" className="text-blue-600 hover:text-blue-800 font-medium">
                    View Bookings →
                  </Link>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Favorites</h3>
                  <p className="text-gray-600 mb-4">Save hostels you love and book them later</p>
                  <Link to="/favorites" className="text-green-600 hover:text-green-800 font-medium">
                    View Favorites →
                  </Link>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Profile</h3>
                  <p className="text-gray-600 mb-4">Update your information and preferences</p>
                  <Link to="/profile" className="text-purple-600 hover:text-purple-800 font-medium">
                    Edit Profile →
                  </Link>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Payments</h3>
                  <p className="text-gray-600 mb-4">Track payments and manage billing</p>
                  <Link to="/payments" className="text-yellow-600 hover:text-yellow-800 font-medium">
                    View Payments →
                  </Link>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Support</h3>
                  <p className="text-gray-600 mb-4">Get help with bookings and account issues</p>
                  <Link to="/support" className="text-red-600 hover:text-red-800 font-medium">
                    Get Support →
                  </Link>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                  <p className="text-gray-600 mb-4">Overview of your activity and quick actions</p>
                  <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Go to Dashboard →
                  </Link>
                </div>
              </>
            ) : (
              // Basic features for non-logged-in users
              <>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                  <p className="text-gray-600">Find hostels by location, price, gender preference, and amenities</p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verified Hostels</h3>
                  <p className="text-gray-600">All hostels are verified for safety, cleanliness, and quality</p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                  <p className="text-gray-600">Safe and secure payment processing with multiple options</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Hostel?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their ideal accommodation through Makeja
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;