
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  Home, 
  MapPin, 
  Users, 
  Shield, 
  Star, 
  Phone, 
  Mail, 
  ArrowRight,
  Building,
  Wifi,
  Car,
  Utensils,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const featuredHostels = [
    {
      id: 1,
      name: "Highrise Hostels",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop",
      location: "Downtown",
      price: "KSH 8,000",
      rating: 4.8,
      features: ["WiFi", "Security", "Parking"]
    },
    {
      id: 2,
      name: "Kejani Living",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
      location: "Westlands",
      price: "KSH 12,000",
      rating: 4.9,
      features: ["WiFi", "Gym", "Laundry"]
    },
    {
      id: 3,
      name: "B-Block Living",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
      location: "Karen",
      price: "KSH 15,000",
      rating: 4.7,
      features: ["WiFi", "Pool", "Security"]
    },
    {
      id: 4,
      name: "Quinta Living",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      location: "Kilimani",
      price: "KSH 10,000",
      rating: 4.6,
      features: ["WiFi", "Parking", "Garden"]
    },
    {
      id: 5,
      name: "Mjenkeuni Living",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
      location: "Eastleigh",
      price: "KSH 9,000",
      rating: 4.5,
      features: ["WiFi", "Security", "Transport"]
    }
  ];

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    if (authMode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long!');
        return;
      }
      // Simulate signup success
      toast.success('Account created successfully! Welcome to Makeja!');
    } else {
      // Simulate login success
      toast.success('Welcome back to Makeja!');
    }
    
    setShowAuthModal(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const AuthModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${showAuthModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-700 shadow-2xl transform transition-all duration-300 ${showAuthModal ? 'scale-100' : 'scale-95'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={closeAuthModal}
            className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium"
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
            >
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm shadow-2xl sticky top-0 z-50 border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Makeja
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#hostels" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                Browse Hostels
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => openAuthModal('login')}
                className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-slate-700 hover:border-slate-600"
              >
                Login
              </button>
              <button 
                onClick={() => openAuthModal('signup')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Hostel
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover comfortable, affordable student accommodation across 
            Kenya. Join thousands of students who found their home away from 
            home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openAuthModal('signup')}
              className="group inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => openAuthModal('login')}
              className="inline-flex items-center px-8 py-3 border-2 border-slate-600 text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">150+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Hostels Available</div>
            </div>
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">1200+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Happy Students</div>
            </div>
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">890+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Successful Bookings</div>
            </div>
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">4.6 ⭐</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section id="hostels" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Hostels</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Discover our most popular hostels, carefully selected for their quality, location, and affordability</p>
            <button className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105">
              See more
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHostels.map((hostel, index) => (
              <div key={hostel.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden hover:shadow-blue-500/10 transition-all duration-500 group border border-slate-700/50 hover:border-slate-600 transform hover:scale-105"
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={hostel.image} 
                    alt={hostel.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-700/50">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-white">{hostel.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{hostel.name}</h3>
                  <div className="flex items-center text-gray-400 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hostel.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hostel.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/30 hover:bg-blue-600/30 transition-colors duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{hostel.price}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                We are the leading platform connecting students with verified, 
                affordable hostel accommodation worldwide. Our mission is to make 
                quality student housing accessible near campuses and make destinations 
                across the globe.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Priority hostel bookings, quality rooms, fitness facilities, 
                and budget-friendly management. Our commitment to excellence in 
                student accommodation has made us the trusted choice for 
                thousands of students.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
                  <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-600/30 group-hover:bg-blue-600/30 transition-colors duration-300">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">Verified Hostels</h3>
                    <p className="text-sm text-gray-400">Quality assured</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
                  <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-600/30 group-hover:bg-purple-600/30 transition-colors duration-300">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">Student Community</h3>
                    <p className="text-sm text-gray-400">Safe environment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 group">
                <Building className="h-12 w-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
                <p className="text-gray-300">Verified Hostels</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-purple-600/50 transition-all duration-300 hover:scale-105 group">
                <Users className="h-12 w-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
                <p className="text-gray-300">Happy Students</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-green-600/50 transition-all duration-300 hover:scale-105 group">
                <MapPin className="h-12 w-12 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-gray-300">Cities Covered</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-yellow-600/50 transition-all duration-300 hover:scale-105 group">
                <Star className="h-12 w-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2">4.8</h3>
                <p className="text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Hostels */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About Our Hostels</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Our partner hostels are carefully selected to meet the unique needs of 
                student travelers. Each hostel features dedicated study areas with 
                comfortable beds, high-speed WiFi, and communal spaces for socializing.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We prioritize safety and security, ensuring that our hostels maintain 
                the highest standards of cleanliness and comfort. With locations 
                strategically placed near universities, libraries, and public transport, 
                our hostels provide easy access to major universities and colleges.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From budget-friendly shared dorms to private rooms, we offer options 
                to suit every student's needs while maintaining the comfort and community 
                that students need to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">Phone</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">+254 798 779 172</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors duration-300">Email</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">info@makeja.com</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">Location</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Makeja
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting students with quality, affordable hostel accommodation. 
                Your comfort and safety is our priority.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 cursor-pointer group">
                  <span className="text-gray-400 group-hover:text-white text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300 cursor-pointer group">
                  <span className="text-gray-400 group-hover:text-white text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300 cursor-pointer group">
                  <span className="text-gray-400 group-hover:text-white text-sm font-bold">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#hostels" className="text-gray-400 hover:text-white transition-colors duration-300">Hostels</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Makeja. All rights reserved. 
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default LandingPage;