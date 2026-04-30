import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user, openLogin } = useContext(AppContext);

  useEffect(() => {
    // Если пользователя нет, автоматически вызываем открытие модалки
    if (!user) {
      openLogin();
    }
  }, [user, openLogin]);

  // Если пользователя нет, не пускаем его на защищенную страницу, 
  // а кидаем на главную (а useEffect выше уже открыл окно логина)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Если юзер есть - всё ок, пускаем!
  return children;
};

export default ProtectedRoute;