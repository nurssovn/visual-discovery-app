import { useState, useCallback } from 'react';
import { readStorage, writeStorage, removeStorage } from '../utils/storage';

const USERS_KEY = 'users_db';
const SESSION_KEY = 'pinterest_user';

function stripPassword(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

export function useAuth() {
  const [user, setUser] = useState(() => stripPassword(readStorage(SESSION_KEY)));

  const getUsersDB = useCallback(() => readStorage(USERS_KEY, []), []);
  const saveUsersDB = useCallback((users) => writeStorage(USERS_KEY, users), []);

  const loginUser = useCallback((userData) => {
    const safeUser = stripPassword(userData);
    setUser(safeUser);
    writeStorage(SESSION_KEY, safeUser);
  }, []);

  const register = useCallback(
    (name, password) => {
      const users = getUsersDB();
      if (users.find((u) => u.name.toLowerCase() === name.toLowerCase())) {
        return { success: false, message: 'Пользователь с таким именем уже существует!' };
      }

      const newUser = {
        name,
        password,
        username: `@${name.toLowerCase().replace(/\s/g, '')}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&rounded=true`,
        bio: '',
      };

      users.push(newUser);
      saveUsersDB(users);
      loginUser(newUser);
      return { success: true };
    },
    [getUsersDB, saveUsersDB, loginUser]
  );

  const login = useCallback(
    (name, password) => {
      const users = getUsersDB();
      const foundUser = users.find(
        (u) => u.name.toLowerCase() === name.toLowerCase() && u.password === password
      );

      if (foundUser) {
        loginUser(foundUser);
        return { success: true };
      }
      return { success: false, message: 'Неверное имя или пароль!' };
    },
    [getUsersDB, loginUser]
  );

  const updateProfile = useCallback(
    (updatedData) => {
      if (!user) {
        return { success: false, message: 'Сначала войдите в аккаунт' };
      }

      const users = getUsersDB();
      const userIndex = users.findIndex((u) => u.username === user.username);

      if (userIndex === -1) {
        return { success: false, message: 'Пользователь не найден' };
      }

      const { password: _pw, ...safeUpdates } = updatedData;
      const newUserObj = { ...users[userIndex], ...safeUpdates };
      users[userIndex] = newUserObj;
      saveUsersDB(users);
      loginUser(newUserObj);
      return { success: true };
    },
    [user, getUsersDB, saveUsersDB, loginUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    removeStorage(SESSION_KEY);
  }, []);

  return { user, register, login, logout, updateProfile };
}
