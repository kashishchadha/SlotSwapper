import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [lastChecked, setLastChecked] = useState(Date.now());

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkNotifications = async () => {
      try {
        const { data } = await API.get('/swaps/incoming');
        if (data.success) {
          const newRequests = data.requests.filter(
            req => new Date(req.createdAt).getTime() > lastChecked
          );
          
          if (newRequests.length > 0) {
            setNotifications(prev => prev + newRequests.length);
            newRequests.forEach(req => {
              toast.info(`🔔 New swap request from ${req.requester?.fullName}`, {
                position: 'top-right',
                autoClose: 5000,
              });
            });
            setLastChecked(Date.now());
          }
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

    // Check immediately on mount
    checkNotifications();

    // Then check every 30 seconds
    const interval = setInterval(checkNotifications, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, lastChecked]);

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success(data.message || 'Login successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const { data } = await API.post('/auth/register', { fullName, email, password });
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success(data.message || 'Registration successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    notifications,
    login,
    register,
    logout,
    updateUser,
    clearNotifications
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
