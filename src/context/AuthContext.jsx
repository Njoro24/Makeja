import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Auth action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING'
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  token: null
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check if user is already authenticated (e.g., from stored token)
  const checkAuthStatus = async () => {
    try {
      // In a real app, you would check localStorage or make an API call
      // to verify if the user has a valid session
      const storedToken = getStoredToken();
      const storedUser = getStoredUser();

      if (storedToken && storedUser) {
        // Verify token is still valid (optional API call)
        const isTokenValid = await verifyToken(storedToken);
        
        if (isTokenValid) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: storedUser,
              token: storedToken
            }
          });
        } else {
          // Token is invalid, remove stored data
          removeStoredAuth();
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // Simulate API call - replace with your actual auth service
      const response = await simulateLoginAPI(credentials);

      if (response.success) {
        const { user, token } = response.data;
        
        // Store auth data
        storeAuthData(user, token);

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user, token }
        });

        return { success: true, user };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      // Simulate API call - replace with your actual auth service
      const response = await simulateRegisterAPI(userData);

      if (response.success) {
        const { user, token } = response.data;
        
        // Store auth data
        storeAuthData(user, token);

        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: { user, token }
        });

        return { success: true, user };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Optional: Make API call to invalidate token on server
      await simulateLogoutAPI();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Remove stored auth data
      removeStoredAuth();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Update user profile
  const updateUser = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData
    });
    
    // Update stored user data
    const updatedUser = { ...state.user, ...userData };
    storeUser(updatedUser);
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Helper functions for storage
  const storeAuthData = (user, token) => {
    // In a real app, you might use secure storage or httpOnly cookies
    const userData = JSON.stringify(user);
    // Simulated storage - in real app use localStorage or secure storage
    globalThis.authStorage = { user: userData, token };
  };

  const getStoredToken = () => {
    return globalThis.authStorage?.token || null;
  };

  const getStoredUser = () => {
    try {
      const userData = globalThis.authStorage?.user;
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  };

  const storeUser = (user) => {
    if (globalThis.authStorage) {
      globalThis.authStorage.user = JSON.stringify(user);
    }
  };

  const removeStoredAuth = () => {
    if (globalThis.authStorage) {
      delete globalThis.authStorage;
    }
  };

  // Simulated API functions - replace with your actual API calls
  const simulateLoginAPI = async (credentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate login validation
    if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
      return {
        success: true,
        data: {
          user: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: credentials.email,
            avatar: null,
            role: 'user',
            emailVerified: true
          },
          token: 'simulated-jwt-token-' + Date.now()
        }
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
  };

  const simulateRegisterAPI = async (userData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate registration
    return {
      success: true,
      data: {
        user: {
          id: Date.now(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          avatar: null,
          role: 'user',
          emailVerified: false
        },
        token: 'simulated-jwt-token-' + Date.now()
      }
    };
  };

  const simulateLogoutAPI = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  };

  const verifyToken = async (token) => {
    try {
      // Simulate token verification
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, you would make an API call to verify the token
      return token && token.startsWith('simulated-jwt-token-');
    } catch (error) {
      return false;
    }
  };

  // Context value
  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    token: state.token,

    // Actions
    login,
    register,
    logout,
    updateUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export the context for advanced use cases
export { AuthContext, AUTH_ACTIONS };

export default AuthProvider;