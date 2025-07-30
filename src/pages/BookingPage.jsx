import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BedDouble, MapPin, ArrowRight, Users, Star, Heart, Filter, Search, Sparkles, Home, DollarSign, Calendar, Eye } from 'lucide-react'

// Sample data - replace with your API call
const sampleRooms = [
  {
    id: 1,
    name: "Luxury Downtown Apartment",
    location: "Westlands, Nairobi",
    price: 4500,
    capacity: 4,
    category: "Apartment",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    description: "Modern apartment with stunning city views",
    amenities: ["WiFi", "Kitchen", "Parking"],
    isNew: true
  },
  {
    id: 2,
    name: "Cozy Studio Near CBD",
    location: "Upper Hill, Nairobi",
    price: 2800,
    capacity: 2,
    category: "Studio",
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    description: "Perfect for business travelers",
    amenities: ["WiFi", "AC", "Workspace"],
    isPopular: true
  },
  {
    id: 3,
    name: "Student Friendly Bedsitter",
    location: "Kileleshwa, Nairobi",
    price: 1500,
    capacity: 2,
    category: "Bedsitter",
    rating: 4.4,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description: "Affordable and comfortable living space",
    amenities: ["WiFi", "Security", "Water"],
    isPremium: false
  },
  {
    id: 4,
    name: "Executive Penthouse Suite",
    location: "Karen, Nairobi",
    price: 8500,
    capacity: 6,
    category: "Apartment",
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    description: "Luxury living with premium amenities",
    amenities: ["Pool", "Gym", "Garden", "Parking"],
    isPremium: true
  }
]

const categories = ['All', 'Apartment', 'Bedsitter', 'Single Room', 'Studio', 'Hostel']

const BookingsPage = () => {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteRooms, setFavoriteRooms] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const fetchRooms = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setRooms(sampleRooms)
        setFilteredRooms(sampleRooms)
        setLoading(false)
      }, 1000)
    } catch (err) {
      console.error('Failed to load rooms')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  useEffect(() => {
    let filtered = rooms

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(room => room.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    )

    setFilteredRooms(filtered)
  }, [rooms, selectedCategory, searchTerm, priceRange])

  const toggleFavorite = (roomId) => {
    const newFavorites = new Set(favoriteRooms)
    if (newFavorites.has(roomId)) {
      newFavorites.delete(roomId)
    } else {
      newFavorites.add(roomId)
    }
    setFavoriteRooms(newFavorites)
  }

  const LoadingSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/5 backdrop-blur rounded-3xl p-6 animate-pulse">
          <div className="bg-white/10 h-48 rounded-2xl mb-4"></div>
          <div className="bg-white/10 h-4 rounded mb-2"></div>
          <div className="bg-white/10 h-3 rounded w-2/3 mb-4"></div>
          <div className="bg-white/10 h-8 rounded"></div>
        </div>
      ))}
    </div>
  )

  const RoomCard = ({ room }) => (
    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:scale-[1.02] hover:bg-white/10 transition-all duration-500 shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {room.isNew && (
            <span className="bg-[#00C2AB] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New
            </span>
          )}
          {room.isPopular && (
            <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-semibold">
              🔥 Popular
            </span>
          )}
          {room.isPremium && (
            <span className="bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white px-3 py-1 rounded-full text-xs font-semibold">
              ✨ Premium
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(room.id)}
          className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur rounded-full hover:bg-black/50 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              favoriteRooms.has(room.id) ? 'fill-[#FF3366] text-[#FF3366]' : 'text-white'
            }`}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black px-3 py-1 rounded-full font-bold">
          KES {room.price.toLocaleString()}/night
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-[#00C2AB] transition-colors line-clamp-2">
            {room.name}
          </h3>
          <div className="flex items-center gap-1 bg-[#FFD166]/20 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />
            <span className="text-sm font-semibold text-[#FFD166]">{room.rating}</span>
          </div>
        </div>

        <p className="text-gray-300 flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-[#00C2AB]" />
          {room.location}
        </p>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {room.capacity} guests
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {room.reviews} reviews
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-[#00C2AB]/20 text-[#00C2AB] px-2 py-1 rounded-full text-xs">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-[#00C2AB] to-[#2575FC] hover:from-[#00A693] hover:to-[#1A5BC2] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Book Now
          </button>
          <button className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1A1A2E] to-[#16213E] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6A11CB] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2575FC] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#00C2AB] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00C2AB] to-[#2575FC] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              <Home className="w-4 h-4" />
              Find Your Perfect Stay
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00C2AB] via-[#2575FC] to-[#6A11CB] bg-clip-text text-transparent mb-4">
              Available Rooms
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing places to stay with verified hosts and premium amenities
            </p>
          </div>

          {/* Controls */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#00C2AB] focus:ring-2 focus:ring-[#00C2AB]/20 transition-all placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#00C2AB] text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Host Button */}
              <Link
                to="/host-room"
                className="bg-gradient-to-r from-[#00C2AB] to-[#2575FC] hover:from-[#00A693] hover:to-[#1A5BC2] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Become a Host
              </Link>
            </div>

            {/* Price Range */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 whitespace-nowrap">Price Range:</span>
                <div className="flex-1 max-w-md">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00C2AB]"
                  />
                </div>
                <span className="text-sm text-gray-300 whitespace-nowrap">
                  KES 0 - {priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-300">
              {loading ? 'Loading...' : `${filteredRooms.length} properties found`}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Room Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Home className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No rooms found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchTerm('')
                  setPriceRange([0, 10000])
                }}
                className="bg-[#00C2AB] hover:bg-[#00A693] px-6 py-3 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-20 grid md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Happy Guests', icon: '😊' },
              { number: '2K+', label: 'Properties', icon: '' },
              { number: '500+', label: 'Verified Hosts', icon: '✅' },
              { number: '4.8', label: 'Average Rating', icon: '⭐' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingsPage