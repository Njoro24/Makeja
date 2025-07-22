

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/common/Navigation';
import HostelList from '@/components/hostel/HostelList';
import HostelDetail from '@/pages/HostelDetail';

const App = () => {
  return (
    <Router>
      <div className="bg-muted min-h-screen">
        <Navigation />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HostelList />} />
            <Route path="/hostels/:id" element={<HostelDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
