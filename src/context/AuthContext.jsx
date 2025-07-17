import React, { useState, useEffect, createContext, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [userId, setUserId] = useState(null);

  const login = useCallback(async (username, password) => {
    setLoadingAuth(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const user = { uid: data.uid || 'custom-user-' + Math.random().toString(36).substring(2, 11), ...data };
      setCurrentUser(user);
      setUserId(user.uid);
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      console.error("Custom backend login error:", error);
      setCurrentUser(null);
      setUserId(null);
      localStorage.removeItem('authToken');
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoadingAuth(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
      });
      setCurrentUser(null);
      setUserId(null);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error("Custom backend logout error:", error);
      setCurrentUser(null);
      setUserId(null);
      localStorage.removeItem('authToken');
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoadingAuth(true);
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await fetch('/api/auth/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            const user = { uid: data.uid || 'custom-user-' + Math.random().toString(36).substring(2, 11), ...data };
            setCurrentUser(user);
            setUserId(user.uid);
          } else {
            setCurrentUser(null);
            setUserId(null);
            localStorage.removeItem('authToken');
          }
        } else {
          const anonymousId = crypto.randomUUID();
          setUserId(anonymousId);
          setCurrentUser({ uid: anonymousId, isAnonymous: true });
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setCurrentUser(null);
        setUserId(null);
        localStorage.removeItem('authToken');
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const authContextValue = {
    currentUser,
    loadingAuth,
    userId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
