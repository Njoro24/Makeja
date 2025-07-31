import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f1f1f',
            color: '#fff',
            border: '1px solid #333'
          }
        }}
      />
      <App />
    </Router>
  </React.StrictMode>
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
