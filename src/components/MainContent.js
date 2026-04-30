import React, { useState, useEffect } from 'react'; 
import CategoryNav from './CategoryNav';
import PinCard from './PinCard';
import PinSkeleton from './PinSkeleton'; 

function MainContent({ pins, onDeletePin, onToggleSave, activeCategory, onCategoryChange, user }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 600);

    return () => clearTimeout(timer); 
  }, [activeCategory]); 

  return (
    <main className="main-content">
      
      {/* УСЛОВИЕ: Показываем категории ТОЛЬКО если есть user */}
      {user && (
        <CategoryNav 
          activeCategory={activeCategory} 
          onCategoryChange={onCategoryChange} 
        />
      )}
      
      <div className="masonry-grid">
        {isLoading ? (
          Array(12).fill(0).map((_, i) => <PinSkeleton key={i} />)
        ) : (
          pins.length > 0 ? (
            pins.map((pin) => {
              // ВЫЧИСЛЯЕМ: сохранен ли этот пин именно ТЕКУЩИМ пользователем?
              const isSavedByMe = pin.savedBy && user && pin.savedBy.includes(user.username);
              
              return (
                <PinCard 
                  key={pin.id} 
                  id={pin.id} 
                  image={pin.image} 
                  saved={isSavedByMe} // <-- Передаем вычисленный статус!
                  onDelete={onDeletePin} 
                  onToggleSave={onToggleSave}
                />
              );
            })
          ) : (
            <h3 style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: '#777' }}>
              Ничего не найдено 😢
            </h3>
          )
        )}
      </div>
    </main>
  );
}

export default MainContent;