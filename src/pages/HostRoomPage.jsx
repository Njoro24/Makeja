import { useState } from 'react'
import { Upload, MapPin, DollarSign, Users, Home, Camera, Check, Star, Sparkles } from 'lucide-react'

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
]

const HostRoomsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    capacity: '',
    category: '',
    image: '',
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageMethod, setImageMethod] = useState('upload') // 'upload' or 'url'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-advance steps based on filled fields
    if (currentStep === 1 && formData.name && formData.location && formData.description && name === 'description') {
      setCurrentStep(2)
    } else if (currentStep === 2 && formData.price && formData.capacity && formData.category && name === 'category') {
      setCurrentStep(3)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value
    setFormData((prev) => ({ ...prev, image: url }))
    setImagePreview(url)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
        setImagePreview(reader.result)
        setImageMethod('upload')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Room hosted successfully! 🎉')
    }, 2000)
  }

  const getStepColor = (step) => {
    if (step < currentStep) return 'bg-green-600'
    if (step === currentStep) return 'bg-blue-600'
    return 'bg-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
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

          {/* Progress Steps */}
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

          {/* Main Form */}
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="space-y-8">
                {/* Step 1: Basic Info Section */}
                {currentStep >= 1 && (
                  <div className={`space-y-6 transition-all duration-500 ${currentStep === 1 ? 'opacity-100' : 'opacity-75'}`}>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Home className="w-6 h-6 text-blue-400" />
                      Property Details
                      {currentStep > 1 && <Check className="w-5 h-5 text-green-400" />}
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Property Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="e.g. Cozy Downtown Apartment"
                          value={formData.name}
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
                            name="price"
                            placeholder="2500"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
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

                    {/* Category Selection */}
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

                {/* Step 3: Image Upload */}
                {currentStep >= 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Camera className="w-6 h-6 text-purple-400" />
                      Property Photo
                    </h2>

                    {/* Method Selection */}
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          setImageMethod('upload')
                          setImagePreview(null)
                          setFormData(prev => ({ ...prev, image: '' }))
                        }}
                        className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                          imageMethod === 'upload' 
                            ? 'bg-blue-700 text-gray-100' 
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        <Upload className="w-4 h-4 inline mr-2" />
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setImageMethod('url')
                          setImagePreview(null)
                          setFormData(prev => ({ ...prev, image: '' }))
                        }}
                        className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                          imageMethod === 'url' 
                            ? 'bg-blue-700 text-gray-100' 
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                         Image URL
                      </button>
                    </div>

                    {imageMethod === 'upload' ? (
                      <div 
                        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                          dragActive 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                setFormData(prev => ({ ...prev, image: '' }))
                              }}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">Upload Property Image</h3>
                            <p className="text-gray-500 mb-4">Drag and drop or click to browse</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="imageUpload"
                            />
                            <label
                              htmlFor="imageUpload"
                              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-xl cursor-pointer transition-colors"
                            >
                              <Camera className="w-4 h-4" />
                              Choose File
                            </label>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Image URL</label>
                          <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={handleImageUrlChange}
                            className="w-full p-4 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                          />
                        </div>
                        {imagePreview && (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-xl"
                              onError={() => {
                                setImagePreview(null)
                                alert('Failed to load image from URL')
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                setFormData(prev => ({ ...prev, image: '' }))
                              }}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
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
                          (currentStep === 1 && (!formData.name || !formData.location || !formData.description)) ||
                          (currentStep === 2 && (!formData.price || !formData.capacity || !formData.category))
                        }
                        className="px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
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
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { icon: '', title: 'Earn Extra Income', desc: 'Turn your space into a steady revenue stream' },
              { icon: '', title: 'Secure Platform', desc: 'Safe payments and verified guests' },
              { icon: '', title: 'Easy Management', desc: 'Manage bookings from anywhere' }
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
  )
}

export default HostRoomsPage