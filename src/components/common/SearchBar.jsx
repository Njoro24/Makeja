import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBar({ onSearch, isExpanded = false }) {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    gender: '',
    sortBy: 'price-asc'
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(isExpanded);
  const navigate = useNavigate();
  const location = useLocation();

  // Popular locations in Kenya
  const popularLocations = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 
    'Thika', 'Machakos', 'Meru', 'Nyeri', 'Kericho'
  ];

  // Room options
  const roomOptions = [
    { value: '1', label: '1 Room' },
    { value: '2', label: '2 Rooms' },
    { value: '3', label: '3 Rooms' },
    { value: '4', label: '4+ Rooms' }
  ];

  // Gender options
  const genderOptions = [
    { value: 'male', label: 'Male Only' },
    { value: 'female', label: 'Female Only' },
    { value: 'mixed', label: 'Mixed' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle search
  const handleSearch = (e) => {
    e?.preventDefault();
    
    // Clean up filters - remove empty values
    const cleanFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key] !== '') {
        acc[key] = filters[key];
      }
      return acc;
    }, {});

    // Call parent onSearch if provided
    if (onSearch) {
      onSearch(cleanFilters);
    }

    // Navigate to hostels page with filters as query params
    const searchParams = new URLSearchParams();
    Object.keys(cleanFilters).forEach(key => {
      searchParams.set(key, cleanFilters[key]);
    });
    
    navigate(`/hostels?${searchParams.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      gender: '',
      sortBy: 'price-asc'
    });
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  // Load filters from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters = {};
    
    searchParams.forEach((value, key) => {
      if (filters.hasOwnProperty(key)) {
        urlFilters[key] = value;
      }
    });
    
    if (Object.keys(urlFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...urlFilters }));
    }
  }, [location.search]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search location (e.g., Nairobi, Mombasa...)"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              list="locations"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
            {/* Location suggestions */}
            <datalist id="locations">
              {popularLocations.map(location => (
                <option key={location} value={location} />
              ))}
            </datalist>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleFilters}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Filters
            </button>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isFiltersVisible && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Price Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price Range (KSH)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleInputChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Number of Rooms */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                <select
                  value={filters.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Any</option>
                  {roomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Preference */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender Preference</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Any</option>
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleInputChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear All Filters
              </button>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Hide Filters
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Active Filters Display */}
      {Object.values(filters).some(value => value !== '' && value !== 'price-asc') && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.location && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              📍 {filters.location}
              <button
                onClick={() => handleInputChange('location', '')}
                className="hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          {filters.minPrice && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              💰 From KSH {filters.minPrice}
              <button
                onClick={() => handleInputChange('minPrice', '')}
                className="hover:text-green-600"
              >
                ×
              </button>
            </span>
          )}
          {filters.maxPrice && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              💰 Up to KSH {filters.maxPrice}
              <button
                onClick={() => handleInputChange('maxPrice', '')}
                className="hover:text-green-600"
              >
                ×
              </button>
            </span>
          )}
          {filters.rooms && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              🏠 {roomOptions.find(r => r.value === filters.rooms)?.label}
              <button
                onClick={() => handleInputChange('rooms', '')}
                className="hover:text-purple-600"
              >
                ×
              </button>
            </span>
          )}
          {filters.gender && (
            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              👤 {genderOptions.find(g => g.value === filters.gender)?.label}
              <button
                onClick={() => handleInputChange('gender', '')}
                className="hover:text-pink-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;