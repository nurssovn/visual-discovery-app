import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PinCard from './PinCard'; // Убедись, что путь к PinCard правильный

function SavedPins() {
  // 1. Достаем user из контекста
  const { pins, user, handleDeletePin, handleToggleSave } = useContext(AppContext);

  // 2. НОВАЯ ЛОГИКА ФИЛЬТРАЦИИ: ищем пины, где в массиве savedBy есть имя текущего юзера
  const savedPins = pins.filter(pin => 
    pin.savedBy && user && pin.savedBy.includes(user.username)
  );

  return (
    <div className="masonry-grid" style={{ marginTop: '20px' }}>
      {savedPins.length > 0 ? (
        savedPins.map((pin) => (
          <PinCard 
            key={pin.id} 
            id={pin.id} 
            image={pin.image} 
            saved={true} // Раз пин в этой вкладке, значит он точно сохранен этим юзером
            onDelete={handleDeletePin} 
            onToggleSave={handleToggleSave}
          />
        ))
      ) : (
        <h3 style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: '#777', marginTop: '50px' }}>
          У вас пока нет сохраненных пинов 😢
        </h3>
      )}
    </div>
  );
}

export default SavedPins;