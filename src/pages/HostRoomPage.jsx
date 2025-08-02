import { useState } from 'react';
import { MapPin, DollarSign, Users, Home, Camera, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const categories = [
  { 
    value: 'Apartment', 
    icon: 'https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    desc: 'Full apartment with kitchen' 
  },
  { 
    value: 'Bedsitter', 
    icon: 'https://images.unsplash.com/photo-1665249934445-1de680641f50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    desc: 'Single room with basic amenities' 
  },
  { 
    value: 'Single Room', 
    icon: 'https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    desc: 'Private room in shared space' 
  },
  { 
    value: 'Studio', 
    icon: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    desc: 'Open-plan living space' 
  },
  { 
    value: 'Hostel', 
    icon: 'https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    desc: 'Shared accommodation' 
  }
];

const HostRoomsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    price_per_night: '',
    capacity: '',
    category: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (currentStep === 1 && formData.title && formData.location && formData.description && name === 'description') {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.price_per_night && formData.capacity && formData.category && name === 'category') {
      setCurrentStep(3);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const validateFormData = () => {
    const errors = [];
    if (!formData.title.trim()) errors.push('Property title is required');
    if (!formData.location.trim()) errors.push('Location is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.price_per_night || isNaN(Number(formData.price_per_night))) errors.push('Valid price is required');
    if (!formData.capacity || isNaN(Number(formData.capacity))) errors.push('Valid capacity is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.image.trim()) errors.push('Image URL is required');
    
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      validateFormData();

      // Debug token retrieval
      const token = localStorage.getItem('token');
      console.log('Retrieved token:', token);
      
      // Verify token structure
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        localStorage.removeItem('token');
        throw new Error('Invalid session. Please login again.');
      }

      const payload = {
        title: formData.title.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        price_per_night: Number(formData.price_per_night),
        capacity: Number(formData.capacity),
        category: formData.category,
        image: formData.image.trim()
      };

      console.log('Submitting payload:', payload);

      const response = await fetch('http://localhost:5000/api/admin/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Session expired. Please login again.');
        } else if (response.status === 422) {
          throw new Error(data.msg || 'Validation failed. Please check your inputs.');
        } else {
          throw new Error(data.msg || `Server error: ${response.status}`);
        }
      }

      toast.success('Room created successfully!', {
        style: {
          background: '#10B981',
          color: '#fff',
        }
      });

      // Reset form
      setFormData({
        title: '',
        location: '',
        description: '',
        price_per_night: '',
        capacity: '',
        category: '',
        image: ''
      });
      setImagePreview(null);
      setCurrentStep(1);

    } catch (error) {
      console.error('Submission error:', error);
      
      if (error.message.includes('login') || error.message.includes('session') || error.message.includes('token')) {
        navigate('/login');
      }

      toast.error(error.message, {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepColor = (step) => {
    if (step < currentStep) return 'bg-green-600';
    if (step === currentStep) return 'bg-blue-600';
    return 'bg-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-800 to-purple-800 text-gray-100 px-6 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Host Your Space
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-gray-300 bg-clip-text text-transparent mb-4">
              List Your Property
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform your space into income. Join thousands of hosts earning with style.
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-100 font-bold transition-all duration-300 ${getStepColor(step)}`}>
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && <div className="w-16 h-1 bg-gray-800 rounded-full mx-2"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Form container */}
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Step 1: Property Details */}
                  {currentStep >= 1 && (
                    <div className={`space-y-6 transition-all duration-500 ${currentStep === 1 ? 'opacity-100' : 'opacity-75'}`}>
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Home className="w-6 h-6 text-blue-400" />
                        Property Details
                        {currentStep > 1 && <Check className="w-5 h-5 text-green-400" />}
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Property Title</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="e.g. Cozy Downtown Apartment"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                              type="text"
                              name="location"
                              placeholder="e.g. Nairobi, Kenya"
                              value={formData.location}
                              onChange={handleChange}
                              className="w-full p-4 pl-12 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Description</label>
                        <textarea
                          name="description"
                          placeholder="Describe your space, amenities, and what makes it special..."
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          className="w-full p-4 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 resize-none"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Pricing & Capacity */}
                  {currentStep >= 2 && (
                    <div className={`space-y-6 transition-all duration-500 ${currentStep === 2 ? 'opacity-100' : 'opacity-75'}`}>
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-green-400" />
                        Pricing & Capacity
                        {currentStep > 2 && <Check className="w-5 h-5 text-green-400" />}
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Price per Night (KES)</label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                              type="number"
                              name="price_per_night"
                              placeholder="2500"
                              value={formData.price_per_night}
                              onChange={handleChange}
                              min="0"
                              step="0.01"
                              className="w-full p-4 pl-12 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Guest Capacity</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                              type="number"
                              name="capacity"
                              placeholder="2"
                              value={formData.capacity}
                              onChange={handleChange}
                              min="1"
                              className="w-full p-4 pl-12 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-400">Property Type</label>
                        <div className="grid md:grid-cols-3 gap-4">
                          {categories.map((cat) => (
                            <label key={cat.value} className="cursor-pointer group">
                              <input
                                type="radio"
                                name="category"
                                value={cat.value}
                                checked={formData.category === cat.value}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                                formData.category === cat.value 
                                  ? 'border-blue-500 bg-blue-500/10' 
                                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                              }`}>
                                <img 
                                  src={cat.icon} 
                                  alt={cat.value} 
                                  className="w-12 h-12 object-cover rounded-lg mb-2 mx-auto"
                                />
                                <h3 className="font-semibold text-sm">{cat.value}</h3>
                                <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Property Photo */}
                  {currentStep >= 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Camera className="w-6 h-6 text-purple-400" />
                        Property Photo
                      </h2>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Image URL</label>
                          <input
                            type="url"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={handleImageUrlChange}
                            className="w-full p-4 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                            required
                          />
                        </div>
                        {imagePreview && (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-xl"
                              onError={() => {
                                setImagePreview(null);
                                toast.error('Failed to load image from URL');
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData(prev => ({ ...prev, image: '' }));
                              }}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between pt-8">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    
                    <div className="ml-auto">
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          disabled={
                            (currentStep === 1 && (!formData.title || !formData.location || !formData.description)) ||
                            (currentStep === 2 && (!formData.price_per_night || !formData.capacity || !formData.category))
                          }
                          className="px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                        >
                          Next Step
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 disabled:opacity-50 px-8 py-3 rounded-xl text-gray-100 font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-100 rounded-full animate-spin"></div>
                              Hosting Your Property...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              Host My Property
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Benefits section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'Earn Extra Income', desc: 'Turn your space into a steady revenue stream' },
              { icon: '🔒', title: 'Secure Platform', desc: 'Safe payments and verified guests' },
              { icon: '📱', title: 'Easy Management', desc: 'Manage bookings from anywhere' }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 bg-gray-900/50 backdrop-blur rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostRoomsPage;