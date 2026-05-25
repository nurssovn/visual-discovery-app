import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import PinCard from './PinCard';
import { canDeletePin } from '../utils/filterPins';

function SavedPins() {
  const { pins, isLoading, handleDeletePin, handleToggleSave } = useContext(AppContext);
  const { user } = useAuthContext();

  const savedPins = pins.filter(
    (pin) => pin.savedBy && user && pin.savedBy.includes(user.username)
  );

  if (isLoading) {
    return <p className="page-message">Загрузка сохранённых...</p>;
  }

  if (savedPins.length > 0) {
    return (
      <div className="masonry-grid profile-saved-grid">
        {savedPins.map((pin) => (
          <PinCard
            key={pin.id}
            id={pin.id}
            image={pin.image}
            saved
            canDelete={canDeletePin(pin, user.username)}
            onDelete={handleDeletePin}
            onToggleSave={handleToggleSave}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="profile-empty-state">
      <div className="empty-icon">🎨</div>
      <h3>Здесь пока пусто</h3>
      <p>Сохраняйте пины на главной — они появятся в этой вкладке.</p>
    </div>
  );
}

export default SavedPins;
