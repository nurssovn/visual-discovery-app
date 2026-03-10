import React from 'react';

function SearchBar() {
  // Событие 1: Срабатывает при каждом вводе буквы
  const handleSearchChange = (event) => {
    console.log("Пользователь ищет:", event.target.value);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search for ideas..." 
        onChange={handleSearchChange} // Слушатель события
      />
    </div>
  );
}

export default SearchBar;