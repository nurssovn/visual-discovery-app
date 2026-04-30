import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import { AppContext } from '../context/AppContext';

function Home() {
  // 1. Достаем user из контекста
  const { pins, isLoading, error, handleDeletePin, handleToggleSave, user } = useContext(AppContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // 2. Если пользователь выходит, принудительно сбрасываем категорию на 'all'
  useEffect(() => {
    if (!user) {
      setActiveCategory('all');
    }
  }, [user]);

  const filteredPins = pins.filter((pin) => {
    const matchesSearch = pin.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (pin.image === "") return false;
    
    if (activeCategory === 'saved') {
      const isSavedByMe = pin.savedBy && user && pin.savedBy.includes(user.username);
      return isSavedByMe && matchesSearch;
    }
    
    const matchesCategory = activeCategory === 'all' || pin.category === activeCategory;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={(e) => setSearchTerm(e.target.value)} 
      />
      
      {isLoading && <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Загрузка пинов с сервера... ⏳</h2></div>}
      
      {error && <div style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}><h2>Ошибка: {error}</h2></div>}
      
      {!isLoading && !error && (
        <MainContent 
          pins={filteredPins} 
          onDeletePin={handleDeletePin}
          onToggleSave={handleToggleSave}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          user={user} // 3. Передаем user внутрь MainContent!
        />
      )}
    </div>
  );
}

export default Home;