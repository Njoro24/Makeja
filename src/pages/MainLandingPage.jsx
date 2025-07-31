
import React, { useState } from 'react';
import '../index.css';
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
  X,
  Eye,
  EyeOff,
  Lock,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

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
      location: "Jogoo rd",
      price: "KSH 15,000",
      rating: 4.7,
      features: ["WiFi", "Pool", "Security"]
    },
    {
      id: 4,
      name: "Qwetu Living",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      location: "Kahawa Wendani",
      price: "KSH 10,000",
      rating: 4.6,
      features: ["WiFi", "Parking", "Garden"]
    },
    {
      id: 5,
      name: "Mpeketoni Living",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
      location: "Pangani",
      price: "KSH 9,000",
      rating: 4.5,
      features: ["WiFi", "Security", "Transport"]
    }
  ];

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 4000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (authMode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make actual API calls to your backend
      // const response = await fetch('/api/auth/login', { ... });
      
      if (authMode === 'signup') {
        showNotification('Account created successfully! Welcome to Makeja!', 'success');
      } else {
        showNotification('Welcome back to Makeja!', 'success');
      }
      
      setShowAuthModal(false);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      
    } catch (error) {
      showNotification('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const Notification = () => {
    if (!notification.show) return null;
    
    return (
      <div className="fixed top-4 right-4 z-[60] animate-slide-in">
        <div className={`flex items-center p-4 rounded-lg shadow-lg backdrop-blur-sm border ${
          notification.type === 'success' 
            ? 'bg-green-600/90 border-green-500/50 text-white' 
            : 'bg-red-600/90 border-red-500/50 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-3" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-3" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      </div>
    );
  };

  const AuthModal = () => (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${
      showAuthModal ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <div className={`section-modern bg-slate-900/90 rounded-2xl shadow-2xl border border-white/10 p-8 max-w-md w-full transform transition-all duration-300 text-lg font-medium ${
        showAuthModal ? 'scale-100' : 'scale-95'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3 shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/70 text-sm">
              {authMode === 'login' ? 'Sign in to your account' : 'Sign up to get started'}
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Form */}
        <div className="space-y-4">
          {authMode === 'signup' && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="input-modern w-full pl-10 pr-4 bg-slate-800/60"
              />
              {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
            </div>
          )}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="input-modern w-full pl-10 pr-4 bg-slate-800/60"
            />
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/50" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="input-modern w-full pl-10 pr-12 bg-slate-800/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
          </div>
          
          {authMode === 'signup' && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/50" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className="input-modern w-full pl-10 pr-12 bg-slate-800/60"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors disabled:opacity-50"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>}
            </div>
          )}
          
          {authMode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500" 
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-white/70">Remember me</span>
              </label>
              <button 
                type="button"
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
          )}
          
          <button
            onClick={handleAuthSubmit}
            disabled={isLoading}
            className="btn-modern w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Please wait...</span>
              </>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white/70">
            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              disabled={isLoading}
              className="ml-2 text-blue-300 hover:text-blue-200 font-semibold transition-colors disabled:opacity-50"
            >
              {authMode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/50">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button 
            className="w-full inline-flex justify-center py-2 px-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button 
            className="w-full inline-flex justify-center py-2 px-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 text-lg font-medium">
      {/* Notification */}
      <Notification />

      
      
      {/* Hero Section */}
      <section id="home" className="section-modern pt-20 pb-32 px-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in text-center">
            Your Home Far Away From {' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Home
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed text-center mx-auto max-w-2xl">
            Where students find their home away from home. Quality accommodation that fits your budget and connects you with other Students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openAuthModal('signup')}
              className="btn-modern group inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => openAuthModal('login')}
              className="btn-modern inline-flex items-center"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* AboutSection */}
      <section id="about" className="bg-slate-900 py-16 px-0 w-full">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            We are the leading platform connecting students with verified, affordable hostel accommodation worldwide. 
            Our mission is to make quality student housing accessible near campuses and study destinations across the globe.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            We partner exclusively with student-friendly hostels that offer study spaces, flexible schedules, and budget-conscious rates. 
            Every listing is verified for safety and quality, ensuring you can focus on your studies while enjoying a comfortable stay.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            Join thousands of students who trust us to find their perfect home away from home during their academic journey.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-modern py-16 bg-slate-900/50 backdrop-blur-sm px-0 w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group hover:scale-105 transition-all duration-300 text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">150+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Hostels Available</div>
            </div>
            <div className="group hover:scale-105 transition-all duration-300 text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">1200+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Happy Students</div>
            </div>
            <div className="group hover:scale-105 transition-all duration-300 text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">890+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Successful Bookings</div>
            </div>
            <div className="group hover:scale-105 transition-all duration-300 text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">4.6 ⭐</div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured*/}
      <section id="featured" className="section-modern py-20 bg-gradient-to-b from-slate-950 to-slate-900 px-0 w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Featured Hostels</h2>
            <p className="text-2xl text-gray-300 mb-6 text-center mx-auto max-w-2xl">
              Our partner hostels are carefully selected to meet the unique needs of student travelers. Each hostel features dedicated study areas with reliable WiFi, quiet zones for focused learning, and vibrant common spaces for socializing with fellow students.
            </p>
            <p className="text-2xl text-gray-300 mb-8 text-center mx-auto max-w-2xl">
              All accommodations prioritize safety with 24/7 security, clean facilities, and female-only dorm options where available. Located within walking distance or easy transport access to major universities and colleges, our hostels understand academic schedules with flexible check-in times and extended stays. From budget-friendly shared dorms to private rooms, every hostel offers authentic local experiences while maintaining the comfort and community students need to thrive.
            </p>
            <button className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105">
              See more
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {featuredHostels.map((hostel, index) => (
              <div key={hostel.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden hover:shadow-blue-500/10 transition-all duration-500 group border border-slate-700/50 hover:border-slate-600 transform hover:scale-105 text-left"
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={hostel.image} 
                    alt={hostel.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-white text-lg font-medium">{hostel.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{hostel.name}</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-400">{hostel.price}</div>
                      <div className="text-lg text-gray-400">per month</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300 mb-4 text-lg">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{hostel.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hostel.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-700/50 text-base text-blue-200 rounded-full border border-slate-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600 hover:to-purple-600 border border-blue-500/30 hover:border-transparent text-blue-200 hover:text-white py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="about" className="section-modern py-20 bg-slate-900/50 px-0 w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Why Choose Makeja?</h2>
            <p className="text-gray-300">
              We make finding the perfect student accommodation simple, safe, and affordable
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group border border-slate-700/50 hover:border-blue-500/30 transform hover:scale-105 text-left">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">Prime Locations</h3>
              <p className="text-gray-300 leading-relaxed">
                All our hostels are strategically located near universities, with easy access to transport and amenities.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-purple-500/10 transition-all duration-500 group border border-slate-700/50 hover:border-purple-500/30 transform hover:scale-105 text-left">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">Safety First</h3>
              <p className="text-gray-300 leading-relaxed">
                24/7 security, CCTV surveillance, and secure access systems ensure your safety and peace of mind.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-green-500/10 transition-all duration-500 group border border-slate-700/50 hover:border-green-500/30 transform hover:scale-105 text-left">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">Community Living</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with like-minded students in a vibrant community environment designed for academic success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-modern py-20 bg-gradient-to-b from-slate-950 to-slate-900 px-0 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Get In Touch</h2>
            <p className="text-gray-300">
              Have questions? Need help finding the perfect accommodation? We're here to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start text-left">
            <div className="space-y-8 text-left">
              <div className="flex items-center space-x-4 group text-left">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-300">+254 700 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group text-left">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-300">hello@makeja.co.ke</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group text-left">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Office</h3>
                  <p className="text-gray-300">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            
            <div className="section-modern bg-slate-900/90 p-8 rounded-2xl shadow-2xl border border-white/10 text-left">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                 <input 
                   type="text" 
                   className="input-modern w-full bg-slate-800/60"
                   placeholder="Your full name"
                 />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                 <input 
                   type="email" 
                   className="input-modern w-full bg-slate-800/60"
                   placeholder="your.email@example.com"
                 />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                 <textarea 
                   rows="4" 
                   className="input-modern w-full resize-none bg-slate-800/60" 
                   placeholder="How can we help you?"
                 ></textarea>
                </div>
               <button 
                 type="submit" 
                 className="btn-modern w-full"
               >
                 Send Message
               </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-modern bg-slate-900 border-t border-slate-800 py-12 px-0 w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Makeja
                </span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Making student accommodation simple, safe, and affordable across Kenya.
              </p>
              <div className="flex space-x-4">
                <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors duration-300">
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    const text = encodeURIComponent(`Check out this amazing hostel on Makeja! 🏠\n\n${window.location.href}\n\nPerfect for your next trip! 🎒`);
                    
                    // Check if mobile device
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    
                    if (isMobile) {
                      // Mobile: Open WhatsApp app
                      window.open(`whatsapp://send?text=${text}`);
                    } else {
                      // Desktop: Open WhatsApp Web
                      window.open(`https://web.whatsapp.com/send?text=${text}`);
                    }
                  }}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors duration-300"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </button>
               
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent('Check out this amazing hostel!');
                    const body = encodeURIComponent(`I found this great hostel on Makeja:\n\n${window.location.href}\n\nThought you might be interested!`);
                    window.open(`mailto:?subject=${subject}&body=${body}`);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors duration-300"
                    aria-label="Share via Gmail"
                  >
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.667L12 11.456l8.697-7.635h1.667c.904 0 1.636.732 1.636 1.636z"/>
                    </svg>
                  </button>           
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#hostels" className="text-gray-300 hover:text-white transition-colors duration-300">Browse Hostels</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8">
            <p className="text-gray-400 text-center">&copy; 2025 Makeja. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default LandingPage;
