import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext'; 
import { useParams, useNavigate, Link } from 'react-router-dom';

function PinDetail() {
  // 1. ДОСТАЛИ И user ИЗ КОНТЕКСТА
  const { pins, handleToggleSave: onToggleSave, user } = useContext(AppContext);
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Защита: пока пины грузятся с сервера
  if (!pins || pins.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>;
  }
  
  // Ищем пин
  const pin = pins.find((p) => String(p.id) === String(id));

  // Если пин не найден
  if (!pin) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Пин не найден :(</div>;
  }

  const relatedBySearch = pins.filter(p => 
    p.category === pin.category && 
    String(p.id) !== String(pin.id) && 
    p.image !== ""
  ).slice(0, 6); 

  // 2. ВЫЧИСЛЯЕМ СТАТУС СОХРАНЕНИЯ ДЛЯ ЭТОГО ЮЗЕРА
  const isSavedByMe = pin.savedBy && user && pin.savedBy.includes(user.username);

  return (
    <div className="pin-detail-page" style={{ marginLeft: '80px', padding: '40px', display: 'flex', justifyContent: 'center' }}>
      
      <div className="pin-detail-card">
        
        {/* ЛЕВАЯ ЧАСТЬ - ГЛАВНОЕ ФОТО */}
        <div className="pin-detail-left" style={{ flex: 1.2 }}>
          <img src={pin.image} alt={pin.title} className="main-pin-image" />
        </div>

        {/* ПРАВАЯ ЧАСТЬ - ИНФО */}
        <div className="pin-detail-right" style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
          
          <div className="pin-detail-right-header">
            <button className="back-arrow-btn" onClick={() => navigate(-1)}>←</button>
            {/* 3. МЕНЯЕМ ЛОГИКУ КНОПКИ (isSavedByMe вместо pin.saved) */}
            <button 
              className={`save-btn ${isSavedByMe ? 'saved' : ''}`}
              style={{ position: 'static', opacity: 1 }}
              onClick={() => onToggleSave(pin.id)}
            >
              {isSavedByMe ? 'Сохранено' : 'Сохранить'}
            </button>
          </div>

          <h1 className="pin-detail-title" style={{ fontSize: '24px' }}>{pin.title}</h1>
          <p className="pin-detail-category">Категория: {pin.category}</p>

          {/* КОММЕНТАРИИ */}
          <div className="comments-section" style={{ flex: 1 }}>
             <p><strong>24 комментария</strong></p>
             <div className="comment-item">
                <div className="user-avatar-circle"></div>
                <p style={{ fontSize: '13px' }}><strong>user</strong> Lips so kissable...</p>
             </div>
          </div>

          {/* ПОХОЖИЕ КАРТИНКИ */}
          <div className="related-section">
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Похожее из {pin.category}</p>
            <div className="related-mini-grid">
              {relatedBySearch.map(item => (
                <Link key={item.id} to={`/pin/${item.id}`}>
                  <img src={item.image} alt="" />
                </Link>
              ))}
            </div>
          </div>

          {/* ИНПУТ ВНИЗУ */}
          <div className="comment-input-wrapper" style={{ marginTop: '20px' }}>
            <div className="user-avatar-circle grey-avatar"></div>
            <input type="text" placeholder="Добавить комментарий" disabled />
          </div>

        </div>
      </div>
    </div>
  );
}

export default PinDetail;