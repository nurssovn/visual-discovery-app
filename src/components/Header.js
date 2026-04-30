import React from 'react';
import UserProfile from './UserProfile';

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="app-header">
      
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Поиск" 
          value={searchTerm} 
          onChange={onSearchChange} 
        />
      </div>

      <UserProfile />
    </header>
  );
}

export default Header;