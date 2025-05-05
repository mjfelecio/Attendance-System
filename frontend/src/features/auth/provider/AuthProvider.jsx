import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // User state can hold user info if logged in, null otherwise
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simulate a login function
  const login = async (email, password) => {
    // In a real app, you would call your backend API here
    console.log('Attempting login with:', { email, password });

    // Simulate a successful login for any non-empty email/password
    if (email && password) {
      const dummyUser = { email: email, name: 'Simulated User' };
      setUser(dummyUser);
      console.log('Login successful, setting user and redirecting.');
      // Redirect to dashboard or intended page
      navigate('/Dashboard');
    } else {
      console.log('Login failed: email or password empty.');
      // In a real app, show an error message to the user
    }
  };

  // Simulate a logout function
  const logout = () => {
    setUser(null);
    console.log('Logging out.');
    // Redirect to login page after logout
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);