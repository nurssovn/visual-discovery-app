import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // <-- 1. ИМПОРТИРУЕМ НАШ ХУК

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  // <-- 2. ИСПОЛЬЗУЕМ КАСТОМНЫЙ ХУК ВМЕСТО СТАРОГО СТЕЙТА! -->
  const { user, login, register, logout } = useAuth(); 

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('http://localhost:5001/pins');
        if (!response.ok) throw new Error('Не удалось загрузить пины');
        const data = await response.json();
        setPins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(fetchPins, 800); 
  }, []);

  const handleAddPin = async (newPin) => {
    const pinToAdd = { ...newPin, savedBy: [], id: String(Date.now()) };
    try {
      const response = await fetch('http://localhost:5001/pins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pinToAdd)
      });
      const savedPin = await response.json();
      setPins([savedPin, ...pins]);
    } catch (err) {
      console.error('Ошибка при добавлении:', err);
    }
  };

  const handleDeletePin = async (idToRemove) => {
    try {
      await fetch(`http://localhost:5001/pins/${idToRemove}`, { method: 'DELETE' });
      setPins(pins.filter((pin) => pin.id !== idToRemove));
    } catch (err) {
      console.error('Ошибка при удалении:', err);
    }
  };

  const handleToggleSave = async (idToToggle) => {
    if (!user) {
      openLogin(); 
      return; 
    }

    const pinToUpdate = pins.find(pin => String(pin.id) === String(idToToggle));
    
    // Защита от старых пинов: если массива savedBy еще нет, создаем его
    const currentSavedBy = pinToUpdate.savedBy || []; 
    
    // Проверяем, сохранял ли уже ЭТОТ юзер этот пин?
    const hasSaved = currentSavedBy.includes(user.username);

    // Если сохранял - удаляем его из массива. Если нет - добавляем!
    const newSavedBy = hasSaved 
      ? currentSavedBy.filter(username => username !== user.username) 
      : [...currentSavedBy, user.username];

    const updatedPin = { ...pinToUpdate, savedBy: newSavedBy };
    
    try {
      await fetch(`http://localhost:5001/pins/${idToToggle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPin)
      });
      setPins(pins.map((pin) => String(pin.id) === String(idToToggle) ? updatedPin : pin));
    } catch (err) {
      console.error('Ошибка при сохранении:', err);
    }
  };

  return (
    <AppContext.Provider value={{
      pins, isLoading, error, theme, user, 
      isLoginOpen, openLogin, closeLogin, 
      toggleTheme, handleAddPin, handleDeletePin, handleToggleSave, 
      login, register, logout // <-- Добавили register
    }}>
      {children}
    </AppContext.Provider>
  );
};