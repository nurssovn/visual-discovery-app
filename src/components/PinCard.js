import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Toast from './Toast';

function PinCard({ id, image, saved, onDelete, onToggleSave }) {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    
    setTimeout(() => {
      setIsToastVisible(false);
      setTimeout(() => setToastMessage(''), 300);
    }, 3000);
  };

  const handleSaveClick = () => {
    onToggleSave(id);
    if (saved) {
      showToast('Пин удален из сохраненного!');
    } else {
      showToast('Пин сохранен!');
    }
  };

  return (
    <div className="pin-card">
      <Link to={`/pin/${id}`}>
        <img src={image} alt="Pin" />
      </Link>

      <button 
        className={`save-btn ${saved ? 'saved' : ''}`} 
        onClick={handleSaveClick}
      >
        {saved ? 'Сохранено' : 'Сохранить'}
      </button>

      <button className="delete-btn" onClick={() => onDelete(id)}>
        🗑️
      </button>
      
      {isToastVisible && <Toast message={toastMessage} />}
    </div>
  );
}

export default PinCard;