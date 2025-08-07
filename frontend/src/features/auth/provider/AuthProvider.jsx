import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginApi, signupApi } from '../../../services/auth.service.js';
import { Flex, Spinner } from '@chakra-ui/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // On mount, restore user from token if present
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token is valid
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            setUser(null);
          } else {
            setUser({ id: decoded.id, email: decoded.email });
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Redirect based on auth state
  useEffect(() => {
    if (isLoading) return;
    
    const isAuthPage = ['/login', '/signup', '/Signup'].includes(location.pathname);
    
    if (!user && !isAuthPage) {
      navigate('/login', { replace: true });
    } else if (user && isAuthPage) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate, location.pathname]);

  const login = async (email, password) => {
    try {
      const { token } = await loginApi(email, password);
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email });
      navigate('/Dashboard');
    } catch (err) {
      throw err; // caller handles message
    }
  };

  const signup = async (email, password) => {
    try {
      const { token } = await signupApi(email, password);
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email });
      navigate('/Dashboard');
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Changed to navigate to root path where Login component is rendered
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);