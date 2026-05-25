import React, { createContext, useState, useEffect, useCallback, useRef, useContext } from 'react';
import { apiService } from '../services/api';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, openLogin } = useContext(AuthContext);

  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
      toastTimerRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const fetchPins = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getPins();
      setPins([...data].reverse());
    } catch (err) {
      setError('Не удалось загрузить пины. Запустите json-server: npm run server');
      setPins([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPins();
  }, [fetchPins]);

  const handleAddPin = useCallback(
    async (newPin) => {
      if (!user) {
        openLogin();
        return false;
      }

      const { id: _id, ...pinData } = newPin;
      const pinToAdd = {
        ...pinData,
        savedBy: [],
        description: pinData.description || '',
        authorId: user.username,
      };

      try {
        const savedPin = await apiService.createPin(pinToAdd);
        setPins((prev) => [savedPin, ...prev]);
        showToast('Пин успешно создан');
        return true;
      } catch {
        showToast('Не удалось создать пин');
        return false;
      }
    },
    [showToast, user, openLogin]
  );

  const handleDeletePin = useCallback(
    async (idToDelete) => {
      const pin = pins.find((p) => String(p.id) === String(idToDelete));
      if (pin?.authorId && user?.username && pin.authorId !== user.username) {
        showToast('Можно удалять только свои пины');
        return false;
      }

      try {
        await apiService.deletePin(idToDelete);
        setPins((prev) => prev.filter((pin) => String(pin.id) !== String(idToDelete)));
        showToast('Пин успешно удалён');
        return true;
      } catch {
        showToast('Не удалось удалить пин');
        return false;
      }
    },
    [showToast, pins, user]
  );

  const handleToggleSave = useCallback(
    async (idToToggle) => {
      if (!user) {
        openLogin();
        return false;
      }

      const pinToUpdate = pins.find((pin) => String(pin.id) === String(idToToggle));
      if (!pinToUpdate) {
        showToast('Пин не найден');
        return false;
      }

      const currentSavedBy = pinToUpdate.savedBy || [];
      const hasSaved = currentSavedBy.includes(user.username);
      const newSavedBy = hasSaved
        ? currentSavedBy.filter((username) => username !== user.username)
        : [...currentSavedBy, user.username];

      const updatedPin = { ...pinToUpdate, savedBy: newSavedBy };

      try {
        await apiService.updatePin(idToToggle, updatedPin);
        setPins((prev) =>
          prev.map((pin) => (String(pin.id) === String(idToToggle) ? updatedPin : pin))
        );
        showToast(hasSaved ? 'Убрано из сохранённых' : 'Добавлено в сохранённые');
        return true;
      } catch {
        showToast('Не удалось обновить пин');
        return false;
      }
    },
    [user, pins, openLogin, showToast]
  );

  return (
    <AppContext.Provider
      value={{
        pins,
        isLoading,
        error,
        theme,
        toggleTheme,
        fetchPins,
        handleAddPin,
        handleDeletePin,
        handleToggleSave,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
