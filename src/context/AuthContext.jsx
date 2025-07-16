import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import {toast} from 'react-toastify';
import {getItem, setItem, removeItem, STORAGE_KEYS} from '../utils/localStorage';
import {apiHelpers } from '../services/api';

// Initial state for authentication
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isloading: true,
    error: null,
    lastActivity: null,
    sessionExpiry: null,

};

//Action types for the auth reducer
const Auth_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    UPDATE_USER: 'UPDATE_USER',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    UPDATE_LAST_ACTIVITY: 'UPDATE_LAST_ACTIVITY',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
};

//Authentication reducer function
const authReducer = (state, action) => {
    switch (action.type) {
       case Auth_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case Auth_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
                lastActivity: new Date (). toISOString(),
                sessionExpiry: action.payload.expiresAt

            };

            case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        lastActivity: null,
        sessionExpiry: null
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        lastActivity: new Date().toISOString()
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_LAST_ACTIVITY:
      return {
        ...state,
        lastActivity: new Date().toISOString()
      };

    case AUTH_ACTIONS.SESSION_EXPIRED:
      return {
        ...initialState,
        isLoading: false,
        error: 'Session expired. Please log in again.'
      };

    default:
      return state;
  }
};

 // Create AuthContext
 
 const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Calculate session expiry time (7 days from now)
  const calculateSessionExpiry = () => {
    const expiryDays = parseInt(process.env.REACT_APP_TOKEN_EXPIRY?.replace('d', '')) || 7;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    return expiryDate.toISOString();
  };

  // Check if token is expired
  const isTokenExpired = (expiryDate) => {
    if (!expiryDate) return true;
    return new Date() > new Date(expiryDate);
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = getItem(STORAGE_KEYS.USER_DATA);
        const lastLogin = getItem(STORAGE_KEYS.LAST_LOGIN);

        if (storedToken && storedUser && lastLogin) {
          // Check if session is still valid
          if (!isTokenExpired(lastLogin.expiresAt)) {
            // Set up axios auth header
            apiHelpers.setAuthToken(storedToken);
            
            dispatch({
              type: AUTH_ACTIONS.LOGIN_SUCCESS,
              payload: {
                user: storedUser,
                token: storedToken,
                expiresAt: lastLogin.expiresAt
              }
            });
            
            // Update last activity
            dispatch({ type: AUTH_ACTIONS.UPDATE_LAST_ACTIVITY });
          } else {
            // Session expired, clean up
            handleLogout(false);
            dispatch({ type: AUTH_ACTIONS.SESSION_EXPIRED });
          }
        } else {
          // No valid session found
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Handle login
  const login = async (userData, token) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const expiresAt = calculateSessionExpiry();
      
      // Store in localStorage
      setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      setItem(STORAGE_KEYS.USER_DATA, userData);
      setItem(STORAGE_KEYS.LAST_LOGIN, {
        timestamp: new Date().toISOString(),
        expiresAt
      });

      // Set up axios auth header
      apiHelpers.setAuthToken(token);

      // Update state
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: userData,
          token,
          expiresAt
        }
      });

      toast.success(`Welcome back, ${userData.firstName}!`);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: 'Login failed. Please try again.'
      });
      return { success: false, error: error.message };
    }
  };

  // Handle logout
  const logout = async (showToast = true) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      // Clear localStorage
      removeItem(STORAGE_KEYS.AUTH_TOKEN);
      removeItem(STORAGE_KEYS.USER_DATA);
      removeItem(STORAGE_KEYS.LAST_LOGIN);

      // Clear axios auth header
      apiHelpers.clearAuthToken();

      // Update state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });

      if (showToast) {
        toast.info('You have been logged out successfully.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Logout failed' });
    }
  };

  // Handle logout without showing toast (for session expiry)
  const handleLogout = (showToast = true) => {
    logout(showToast);
  };

  // Update user profile
  const updateUser = (userData) => {
    try {
      // Update localStorage
      setItem(STORAGE_KEYS.USER_DATA, { ...state.user, ...userData });
      
      // Update state
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: userData
      });

      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: 'Failed to update user profile'
      });
      return { success: false, error: error.message };
    }
  };

  // Clear authentication errors
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Update last activity timestamp
  const updateLastActivity = () => {
    dispatch({ type: AUTH_ACTIONS.UPDATE_LAST_ACTIVITY });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(state.user?.role);
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is student
  const isStudent = () => {
    return hasRole('student');
  };

  // Get user's full name
  const getUserFullName = () => {
    if (!state.user) return '';
    return `${state.user.firstName} ${state.user.lastName}`.trim();
  };

  // Get user's initials
  const getUserInitials = () => {
    if (!state.user) return '';
    const firstName = state.user.firstName || '';
    const lastName = state.user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Check if session is about to expire (within 30 minutes)
  const isSessionExpiringSoon = () => {
    if (!state.sessionExpiry) return false;
    const thirtyMinutes = 30 * 60 * 1000; 
    const expiryTime = new Date(state.sessionExpiry).getTime();
    const currentTime = new Date().getTime();
    return (expiryTime - currentTime) <= thirtyMinutes;
  };

  // Extend session
  const extendSession = () => {
    const newExpiryDate = calculateSessionExpiry();
    setItem(STORAGE_KEYS.LAST_LOGIN, {
      timestamp: new Date().toISOString(),
      expiresAt: newExpiryDate
    });
    
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: { sessionExpiry: newExpiryDate }
    });
  };

  // Context value
  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    lastActivity: state.lastActivity,
    sessionExpiry: state.sessionExpiry,

    // Actions
    login,
    logout: handleLogout,
    updateUser,
    clearError,
    updateLastActivity,
    extendSession,

    // Utility functions
    hasRole,
    hasAnyRole,
    isAdmin,
    isStudent,
    getUserFullName,
    getUserInitials,
    isSessionExpiringSoon,
    isTokenExpired: () => isTokenExpired(state.sessionExpiry)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
            
            

    

