import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../types/auth.types';
import { AuthService } from '../services/auth.service';

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const isValid = await AuthService.validateToken(token);
        if (!isValid) {
          logout();
        }
      }
    };
    validateToken();
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};