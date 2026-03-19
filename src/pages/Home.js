import React, { useState } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';

function Home({ pins, onDeletePin, onToggleSave }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // УМНАЯ ФИЛЬТРАЦИЯ
  const filteredPins = pins.filter((pin) => {
    // Проверка поиска (работает везде)
    const matchesSearch = pin.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Если пустая картинка - скрываем всегда
    if (pin.image === "") return false;

    // ЕСЛИ ВЫБРАНА ВКЛАДКА "SAVED" (СОХРАНЕННЫЕ)
    if (activeCategory === 'saved') {
      return pin.saved === true && matchesSearch;
    }

    // ДЛЯ ОСТАЛЬНЫХ КАТЕГОРИЙ (all, car, art и т.д.)
    const matchesCategory = activeCategory === 'all' || pin.category === activeCategory;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={(e) => setSearchTerm(e.target.value)} 
      />
      
      <MainContent 
        pins={filteredPins} 
        onDeletePin={onDeletePin}
        onToggleSave={onToggleSave}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
    </div>
  );
}

export default Home;