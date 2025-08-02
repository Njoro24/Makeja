// auth.js - Comprehensive Authentication Service with Debugging

class AuthService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
    this.token = this.getStoredToken();
    console.log('[AuthService] Initialized. Token exists:', !!this.token);
  }

  // ==================== TOKEN MANAGEMENT ====================
  getStoredToken() {
    const token = localStorage.getItem('authToken');
    console.log('[AuthService] Retrieved token from localStorage:', token ? '***' + token.slice(-10) : 'NULL');
    return token;
  }

  setToken(token) {
    console.groupCollapsed('[AuthService] Setting token');
    console.log('Raw token received:', token);
    console.log('Token type:', typeof token);
    
    if (!token) {
      console.warn('Attempted to set empty token!');
      console.groupEnd();
      return;
    }

    this.token = token;
    localStorage.setItem('authToken', token);
    console.log('Token stored successfully. Length:', token.length);
    console.log('Sample:', token.slice(0, 10) + '...' + token.slice(-10));
    console.groupEnd();
    return true;
  }

  removeToken() {
    console.log('[AuthService] Clearing token. Previous token existed:', !!this.token);
    this.token = null;
    localStorage.removeItem('authToken');
    console.log('Token cleared successfully');
  }

  // ==================== AUTH STATE ====================
  isAuthenticated() {
    const valid = !!this.token;
    console.log(`[AuthService] Authentication check: ${valid ? 'VALID' : 'INVALID'}`);
    return valid;
  }

  getCurrentUser() {
    if (!this.token) {
      console.warn('[AuthService] No token available for user decoding');
      return null;
    }
    
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      console.log('[AuthService] Decoded token payload:', payload);
      return payload;
    } catch (error) {
      console.error('[AuthService] Token decoding failed:', error);
      this.removeToken();
      return null;
    }
  }

  // ==================== AUTH OPERATIONS ====================
  async login(email, password) {
    console.group('[AuthService] Login attempt for:', email);
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();
      console.log('API Response:', res);

      // Response validation
      if (!res || typeof res !== 'object') {
        throw new Error('Invalid response format');
      }

      if (!response.ok) {
        console.error('Login failed:', res.message);
        throw new Error(res.message || 'Login failed');
      }

      const token = res.access_token;  // Corrected line
      
      if (!token) {
        console.error('No token in response! Full response:', res);
        throw new Error('Authentication token missing');
      }

      this.setToken(token);
      console.log('Login successful. User:', res.user?.email);
      return { success: true, user: res.user };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      };
    } finally {
      console.groupEnd();
    }
  }

  async register(userData) {
    console.group('[AuthService] Registration attempt');
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const res = await response.json();
      console.log('Registration response:', res);

      // Response validation
      if (!res || typeof res !== 'object') {
        throw new Error('Invalid response format');
      }

      if (!response.ok) {
        console.error('Registration failed:', res.errors);
        throw new Error(res.message || 'Registration failed');
      }

      const token = res.access_token;  // Corrected line
      this.setToken(token);
      console.log('Registration successful');
      return { success: true, user: res.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      console.groupEnd();
    }
  }

  logout() {
    console.log('[AuthService] Initiating logout');
    this.removeToken();
    return { success: true };
  }

  // ==================== API COMMUNICATION ====================
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
    console.debug('Generated headers:', headers);
    return headers;
  }

  async apiCall(endpoint, options = {}) {
    console.group(`[AuthService] API call to ${endpoint}`);
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: this.getAuthHeaders(),
      });

      console.log('API response status:', response.status);
      
      if (response.status === 401) {
        console.warn('Authentication expired');
        this.logout();
        window.location.reload(); // Force refresh to reset state
        throw new Error('Session expired');
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  // ==================== PASSWORD MANAGEMENT ====================
  async forgotPassword(email) {
    console.log('[AuthService] Password reset request for:', email);
    return this.apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token, newPassword) {
    console.log('[AuthService] Attempting password reset');
    return this.apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password: newPassword }),
    });
  }
}

// Singleton instance
const authService = new AuthService();

// For testing/development only
if (typeof window !== 'undefined') {
  window.__authService = authService;
  console.log('[AuthService] Debug instance available at window.__authService');
}

export { authService, AuthService };