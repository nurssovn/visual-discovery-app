import React from 'react';
import CategoryNav from './CategoryNav';
import PinCard from './PinCard';

// Добавили activeCategory и onCategoryChange
function MainContent({ pins, onDeletePin, onToggleSave, activeCategory, onCategoryChange }) {
  return (
    <main className="main-content">
      
      {/* Передаем данные в меню категорий */}
      <CategoryNav 
        activeCategory={activeCategory} 
        onCategoryChange={onCategoryChange} 
      />
      
      <div className="masonry-grid">
        {pins.length > 0 ? (
          pins.map((pin) => (
            <PinCard 
              key={pin.id} 
              id={pin.id} 
              image={pin.image} 
              saved={pin.saved}
              onDelete={onDeletePin} 
              onToggleSave={onToggleSave}
            />
          ))
        ) : (
          <h3 style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: '#777' }}>
            Ничего не найдено 😢
          </h3>
        )}
      </div>
    </main>
  );
}

export default MainContent;