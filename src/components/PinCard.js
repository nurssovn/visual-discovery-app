import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // 1. Импортируем useState
import Toast from './Toast'; // 2. Импортируем наш новый компонент Toast

// Принимаем id, image, saved, onDelete, onToggleSave
function PinCard({ id, image, saved, onDelete, onToggleSave }) {
  
  // 3. СОСТОЯНИЯ ДЛЯ УВЕДОМЛЕНИЯ
  const [toastMessage, setToastMessage] = useState(''); // Текст сообщения
  const [isToastVisible, setIsToastVisible] = useState(false); // Видимость

  // 4. ФУНКЦИЯ ДЛЯ ПОКАЗА УВЕДОМЛЕНИЯ
  const showToast = (message) => {
    setToastMessage(message); // Устанавливаем текст
    setIsToastVisible(true); // Показываем
    
    // Автоматически скрываем через 3 секунды (3000 мс)
    setTimeout(() => {
      setIsToastVisible(false);
      // Опционально: очищаем текст через некоторое время, чтобы анимация скрытия прошла плавно
      setTimeout(() => setToastMessage(''), 300);
    }, 3000);
  };

  // 5. ОБРАБОТЧИК КЛИКА НА КНОПКУ "СОХРАНИТЬ"
  const handleSaveClick = () => {
    // Сначала вызываем основную функцию сохранения/удаления
    onToggleSave(id);
    
    // Затем, в зависимости от нового состояния, показываем нужное сообщение
    if (saved) {
      // Если было "Сохранено", значит теперь "Удалено"
      showToast('Пин удален из сохраненного!');
    } else {
      // Если было "Сохранить", значит теперь "Сохранено"
      showToast('Пин сохранен!');
    }
  };

  return (
    <div className="pin-card">
      <Link to={`/pin/${id}`}>
        <img src={image} alt="Pin" />
      </Link>
      
      {/* Кнопка "Сохранить" */}
      <button 
        className={`save-btn ${saved ? 'saved' : ''}`} 
        onClick={handleSaveClick} // <-- 6. Изменили обработчик клика
      >
        {saved ? 'Сохранено' : 'Сохранить'}
      </button>

      {/* Кнопка "Удалить" */}
      <button 
        className="delete-btn" 
        onClick={() => onDelete(id)} 
        title="Удалить пин"
      >
        🗑️
      </button>
      
      {/* 7. УСЛОВНЫЙ РЕНДЕРИНГ: Показываем Toast, если isToastVisible === true */}
      {isToastVisible && <Toast message={toastMessage} />}
    </div>
  );
}

export default PinCard;