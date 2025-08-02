import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import SearchBar from '../components/common/SearchBar';
import { toast } from 'react-toastify';

function Home() {
  const { isAuthenticated, user, logout } = useAuth(); 
  const [featuredHostels, setFeaturedHostels] = useState([]);
  const [stats, setStats] = useState({
    totalHostels: 0,
    totalUsers: 0,
    totalBookings: 0,
    averageRating: 0
  });

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // featured hostels data
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

  // Fixed handleViewDetails function
  const handleViewDetails = (hostelId) => {
    console.log('Navigating to hostel details:', hostelId); // Debug log
    navigate(`/hostel/${hostelId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-blue-600/5 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600/80 via-purple-700/80 to-blue-900/90 text-white py-20 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Find Your Perfect Hostel
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Discover comfortable, affordable student accommodation across Kenya. 
            {isAuthenticated ? ` Welcome back, ${user?.firstName || user?.first_name || user?.name || user?.email || ''}!` : ' Join thousands of students who found their home away from home.'}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-400 text-blue-200 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 border-red-400 text-red-200 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors shadow-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 drop-shadow">
                {stats.totalHostels}+
              </div>
              <div className="text-blue-100">Hostels Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 drop-shadow">
                {stats.totalUsers}+
              </div>
              <div className="text-blue-100">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 drop-shadow">
                {stats.totalBookings}+
              </div>
              <div className="text-blue-100">Successful Bookings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 drop-shadow">
                {stats.averageRating}⭐
              </div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16 bg-slate-900/70">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
              Featured Hostels
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Discover our most popular hostels, carefully selected for their quality, location, and student reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredHostels.map((hostel) => (
              <div
                key={hostel.id}
                className="bg-slate-800/70 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700/50 hover:border-blue-400 overflow-hidden hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Hostel+Image';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-blue-600/90 px-2 py-1 rounded-lg text-sm font-semibold text-white shadow-lg">
                    ⭐ {hostel.rating}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${
                      hostel.gender === 'male' ? 'bg-blue-500/80 text-white' :
                      hostel.gender === 'female' ? 'bg-pink-500/80 text-white' :
                      'bg-purple-500/80 text-white'
                    }`}>
                      {hostel.gender === 'male' ? '👨 Male' : 
                       hostel.gender === 'female' ? '👩 Female' : 
                       '👥 Mixed'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {hostel.name}
                  </h3>
                  
                  <div className="flex items-center text-blue-100 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hostel.location}
                  </div>
                  
                  <div className="flex items-center text-blue-100 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21h2m-2 0H3m2 0h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v12" />
                    </svg>
                    {hostel.rooms} Room{hostel.rooms > 1 ? 's' : ''}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hostel.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-blue-900/60 text-blue-100 px-2 py-1 rounded-full text-xs border border-blue-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-300">
                      KSH {hostel.price.toLocaleString()}
                      <span className="text-sm text-blue-100 font-normal">/month</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(hostel.id)}
                      className="flex-1 bg-blue-700/80 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBookNow(hostel.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm font-medium shadow"
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors inline-block shadow-lg"
            >
              View All Hostels
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-950/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
              {isAuthenticated ? 'Your Makeja Experience' : 'Why Choose Makeja?'}
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              {isAuthenticated 
                ? 'Access all features and manage your hostel experience seamlessly'
                : 'Everything you need to find and book the perfect student accommodation'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-800/70 rounded-lg border border-slate-700/50 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-blue-100">Find hostels by location, price, gender preference, and amenities</p>
            </div>

            <div className="text-center p-6 bg-slate-800/70 rounded-lg border border-slate-700/50 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Hostels</h3>
              <p className="text-blue-100">All hostels are verified for safety, cleanliness, and quality</p>
            </div>

            <div className="text-center p-6 bg-slate-800/70 rounded-lg border border-slate-700/50 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-blue-100">Safe and secure payment processing with multiple options</p>
            </div>
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