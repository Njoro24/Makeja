import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#1f1f1f',
          color: '#fff',
          border: '1px solid #333'
        }
      }} />
      <App />
    </Router>
  </StrictMode>
)
