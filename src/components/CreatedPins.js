import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import PinCard from './PinCard';
import { canDeletePin } from '../utils/filterPins';

function CreatedPins() {
  const { pins, isLoading, handleDeletePin, handleToggleSave } = useContext(AppContext);
  const { user } = useAuthContext();

  const createdPins = pins.filter((pin) => pin.authorId === user?.username);

  if (isLoading) {
    return <p className="page-message">Загрузка ваших пинов...</p>;
  }

  if (createdPins.length > 0) {
    return (
      <div className="masonry-grid profile-saved-grid">
        {createdPins.map((pin) => {
          const isSavedByMe = pin.savedBy?.includes(user.username);
          return (
            <PinCard
              key={pin.id}
              id={pin.id}
              image={pin.image}
              saved={isSavedByMe}
              canDelete={canDeletePin(pin, user.username)}
              onDelete={handleDeletePin}
              onToggleSave={handleToggleSave}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="profile-empty-state">
      <div className="empty-icon">📌</div>
      <h3>Вы ещё не создавали пины</h3>
      <p>Нажмите «+» в боковом меню, чтобы добавить первый пин.</p>
    </div>
  );
}

export default CreatedPins;
