import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, login, register, logout, updateProfile } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoginOpen,
      openLogin,
      closeLogin,
    }),
    [user, login, register, logout, updateProfile, isLoginOpen, openLogin, closeLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
