import { Home } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center p-6 text-white">
    <div className="text-center max-w-md">
      <div className="text-6xl font-bold text-blue-500 mb-4">404</div>
      <div className="w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-full flex items-center justify-center">
        <Home className="w-10 h-10 text-blue-400" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-400 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center justify-center gap-2">
        <Home className="w-4 h-4" /> Go Home
      </button>
    </div>
  </div>
);

export default NotFound;
