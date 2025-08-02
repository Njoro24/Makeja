import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading fallback while checking auth status
  if (isLoading) {
    return fallback || (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If we require auth but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // If we don't require auth but user is authenticated (for login/register pages)
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  // Check role-based access
  if (requireAuth && user) {
    // Handle both allowedRoles array and requiredRole string
    const rolesToCheck = requiredRole ? [requiredRole] : allowedRoles;
    
    if (rolesToCheck.length > 0) {
      // FIX: Check for admin using is_admin boolean
      const userRole = user.is_admin ? 'admin' : 'user';
      
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
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Required role: {rolesToCheck.join(' or ')}, Your role: {userRole}
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