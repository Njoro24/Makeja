import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/auth.js';

// Protected Route Component
const ProtectedRoute = ({ 
  children, 
  redirectTo = '/login', 
  requireAuth = true,
  allowedRoles = [],
  requiredRole = null,
  fallback = null 
}) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  // If we require auth but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // If we don't require auth but user is authenticated
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from || '/dashboard';
    return <Navigate to={from} replace />;
  }

  // Check role-based access
  if (requireAuth && currentUser) {
    // Handle both allowedRoles array and requiredRole string
    const rolesToCheck = requiredRole ? [requiredRole] : allowedRoles;
    
    if (rolesToCheck.length > 0) {
      const userRole = currentUser.role || currentUser.userType;
      if (!rolesToCheck.includes(userRole)) {
        return (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh',
            textAlign: 'center'
          }}>
            <div>
              <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>Access Denied</h1>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                You don't have permission to view this page.
              </p>
              <button 
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        );
      }
    }
  }

  // Show fallback while checking auth status
  if (fallback && requireAuth && !currentUser) {
    return fallback;
  }

  // Render the protected component
  return children;
};

// Export as default
export default ProtectedRoute;

// Additional utility components
export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['admin']} requireAuth={true}>
    {children}
  </ProtectedRoute>
);

export const UserRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['user', 'admin']} requireAuth={true}>
    {children}
  </ProtectedRoute>
);

export const GuestRoute = ({ children }) => (
  <ProtectedRoute requireAuth={false}>
    {children}
  </ProtectedRoute>
);