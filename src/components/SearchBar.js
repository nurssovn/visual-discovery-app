import React from 'react';

function SearchBar() {
  // Событие 2: Отслеживание ввода текста
  const handleSearch = (event) => {
    console.log('Поиск:', event.target.value);
  };

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input 
        type="text" 
        placeholder="Поиск" 
        onChange={handleSearch} 
      />
    </div>
  );
}

export default SearchBar;