import React from 'react';
import UserProfile from './UserProfile';

// Принимаем searchTerm и функцию onSearchChange
function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="app-header">
      
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Поиск" 
          value={searchTerm} // Привязываем значение инпута к стейту
          onChange={onSearchChange} // Обновляем стейт при каждом нажатии клавиши
        />
      </div>

      <UserProfile />
    </header>
  );
}

export default Header;