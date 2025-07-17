import React, { useState, useEffect, useContext } from 'react';
import Navigation from './components/common/Navigation.jsx';
import { ThemeContext, ThemeProvider } from './context/ThemeContext.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import HostelList from './components/hostel/HostelList.jsx';
import HostelDetail from './components/hostel/HostelDetails.jsx';
import { HostelFilters } from './components/hostel/HostelFilters.jsx';
import { useApi } from './hooks/useApi';
import { useDebounce } from './hooks/useDebounce';
import { hostelService } from './services/hostel';

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const { userId, loadingAuth, currentUser, login, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: hostels, loading: loadingHostels, error: hostelsError, fetchData: fetchHostels } = useApi();
  const { data: selectedHostel, loading: loadingHostelDetail, error: hostelDetailError, fetchData: fetchHostelDetail, setData: setSelectedHostelData } = useApi();

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    fetchHostels(() => hostelService.getHostels(debouncedSearchTerm));
  }, [debouncedSearchTerm, filters, fetchHostels]);

  useEffect(() => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    if (pathSegments[0] === 'hostel' && pathSegments[1]) {
      const hostelId = pathSegments[1];
      fetchHostelDetail(() => hostelService.getHostelById(hostelId));
    } else {
      setSelectedHostelData(null);
    }
  }, [currentPath, fetchHostelDetail, setSelectedHostelData]);

  const handleNavigate = (path, state = {}) => {
    window.history.pushState(state, '', path);
    setCurrentPath(path);
  };

  const handleSelectHostel = (id) => {
    handleNavigate(`/hostel/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (currentPath !== '/hostels') {
      handleNavigate('/hostels');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (currentPath !== '/hostels') {
      handleNavigate('/hostels');
    }
  };

  const renderContent = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (loadingAuth) {
      return (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Authenticating...</p>
        </div>
      );
    }

    const displayUserId = userId ? (
      <div className="text-right text-sm text-gray-500 dark:text-gray-400 mb-4">
        User ID: <span className="font-mono">{userId}</span>
      </div>
    ) : null;

    switch (pathSegments[0]) {
      case 'hostel':
        if (pathSegments[1]) {
          return (
            <>
              {displayUserId}
              <HostelDetail
                hostel={selectedHostel}
                loading={loadingHostelDetail}
                error={hostelDetailError}
                onBack={() => handleNavigate('/hostels')}
              />
            </>
          );
        }
      case 'hostels':
      case '':
        return (
          <>
            {displayUserId}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search hostels by name or location..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <HostelFilters onFilterChange={handleFilterChange} />
            <HostelList
              hostels={hostels}
              onSelectHostel={handleSelectHostel}
              loading={loadingHostels}
              error={hostelsError}
            />
          </>
        );
      case 'about':
        return (
          <>
            {displayUserId}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-gray-900 dark:text-white">
              <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">About Kejani</h2>
              <p className="mb-4">
                Kejani is your go-to platform for finding the perfect hostel accommodation across Kenya.
                Whether you're a student, a backpacker, or just looking for an affordable and comfortable stay,
                we connect you with a wide range of hostels tailored to your needs.
              </p>
              <p className="mb-4">
                Our mission is to simplify your search for accommodation, providing detailed information,
                authentic reviews, and easy booking options. We believe in making travel and living
                experiences accessible and enjoyable for everyone.
              </p>
              <p>
                Founded in 2023, Kejani is committed to continuously improving its services and expanding
                its network to bring you the best hostel options in every corner of Kenya.
              </p>
            </div>
          </>
        );
      case 'contact':
        return (
          <>
            {displayUserId}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-gray-900 dark:text-white">
              <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Contact Us</h2>
              <p className="mb-4">
                Have questions, feedback, or need assistance? We're here to help!
                Reach out to our support team through the following channels:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Email: <a href="mailto:support@kejani.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@kejani.com</a></li>
                <li>Phone: <a href="tel:+254712345678" className="text-indigo-600 dark:text-indigo-400 hover:underline">+254 712 345678</a></li>
                <li>Address: 123 Hostel Lane, Nairobi, Kenya</li>
              </ul>
              <p>
                Our customer service team is available Monday to Friday, 9:00 AM to 5:00 PM EAT.
              </p>
            </div>
          </>
        );
      case 'profile':
        return (
          <>
            {displayUserId}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-gray-900 dark:text-white">
              <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">User Profile</h2>
              {currentUser ? (
                <div>
                  <p className="mb-2"><span className="font-semibold">User ID:</span> {currentUser.uid}</p>
                  <p className="mb-2"><span className="font-semibold">Authentication Status:</span> {currentUser.isAnonymous ? 'Anonymous' : 'Authenticated'}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                    This is a basic profile view. In a real application, you would see more user-specific
                    information here.
                  </p>
                  <button
                    onClick={logout}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">No user is currently logged in. You can try to log in:</p>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    id="login-username"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    id="login-password"
                  />
                  <button
                    onClick={() => {
                      const username = document.getElementById('login-username').value;
                      const password = document.getElementById('login-password').value;
                      login(username, password);
                    }}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Login
                  </button>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic mt-2">
                    (Note: This is a simplified login form.)
                  </p>
                </div>
              )}
            </div>
          </>
        );
      default:
        return (
          <>
            {displayUserId}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-gray-900 dark:text-white">
              <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Welcome to Kejani!</h2>
              <p className="mb-4">
                Discover and book hostels across Kenya with ease. Use the navigation above to find your perfect stay.
              </p>
              <p>
                We aim to provide a seamless experience for all your accommodation needs.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} font-sans text-gray-900 dark:text-white transition-colors duration-300`}>
      <div className="container mx-auto p-4 max-w-7xl">
        <Navigation onNavigate={handleNavigate} />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
