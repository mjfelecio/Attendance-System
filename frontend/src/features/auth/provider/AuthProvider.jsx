import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  const login = async (email, password) => {
   
    console.log('Attempting login with:', { email, password });

   
    if (email && password) {
      const dummyUser = { email: email, name: 'Simulated User' };
      setUser(dummyUser);
      console.log('Login successful, setting user and redirecting.');
      
      navigate('/Dashboard');
    } else {
      console.log('Login failed: email or password empty.');
   
    }
  };


  const logout = () => {
    setUser(null);
    console.log('Logging out.');

    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);