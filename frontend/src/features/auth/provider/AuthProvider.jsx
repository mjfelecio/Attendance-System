import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginApi, signupApi } from '../../../services/auth.service.js';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On mount, restore user from token if present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, email: decoded.email });
      } catch (_) {
        localStorage.removeItem('token');
      }
    }
  }, []);

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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);