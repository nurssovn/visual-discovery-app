import { useState } from 'react';

export function useAuth() {
  // Текущий залогиненный юзер
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('pinterest_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Получаем базу всех пользователей (или пустой массив, если никого нет)
  const getUsersDB = () => JSON.parse(localStorage.getItem('users_db') || '[]');
  const saveUsersDB = (users) => localStorage.setItem('users_db', JSON.stringify(users));

  // ФУНКЦИЯ РЕГИСТРАЦИИ
  const register = (name, password) => {
    const users = getUsersDB();
    // Проверяем, есть ли уже такой юзер
    if (users.find(u => u.name.toLowerCase() === name.toLowerCase())) {
      return { success: false, message: 'Пользователь с таким именем уже существует!' };
    }
    
    // Создаем нового юзера
    const newUser = {
      name,
      password, // В реальном проекте пароли шифруют, но для Endterm это топ!
      username: `@${name.toLowerCase().replace(/\s/g, '')}`,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`
    };
    
    users.push(newUser);
    saveUsersDB(users);
    loginUser(newUser); // Сразу логиним после регистрации
    return { success: true };
  };

  // ФУНКЦИЯ ВХОДА
  const login = (name, password) => {
    const users = getUsersDB();
    const foundUser = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === password);
    
    if (foundUser) {
      loginUser(foundUser);
      return { success: true };
    }
    return { success: false, message: 'Неверное имя или пароль!' };
  };

  // Внутренняя функция для установки стейта
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('pinterest_user', JSON.stringify(userData));
  };

  // ФУНКЦИЯ ВЫХОДА
  const logout = () => {
    setUser(null);
    localStorage.removeItem('pinterest_user');
  };

  // Отдаем наружу всё, что нужно
  return { user, register, login, logout };
}