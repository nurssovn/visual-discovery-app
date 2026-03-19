import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PinDetail({ pins, onToggleSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const pin = pins.find((p) => p.id === parseInt(id));

  // ФИЛЬТР: Берем только те, у которых такая же категория, и исключаем текущую картинку
  const relatedBySearch = pins.filter(p => 
    p.category === pin?.category && 
    p.id !== pin?.id && 
    p.image !== ""
  ).slice(0, 6); // Возьмем первые 6 похожих

  if (!pin) return <div className="pin-detail-page">Загрузка...</div>;

  return (
    <div className="pin-detail-page" style={{ marginLeft: '80px', padding: '40px', display: 'flex', justifyContent: 'center' }}>
      
      <div className="pin-detail-card">
        
        {/* ЛЕВАЯ ЧАСТЬ - ГЛАВНОЕ ФОТО (со скруглением) */}
        <div className="pin-detail-left" style={{ flex: 1.2 }}>
          <img src={pin.image} alt={pin.title} className="main-pin-image" />
        </div>

        {/* ПРАВАЯ ЧАСТЬ - ИНФО И ПОХОЖИЕ КАТЕГОРИИ */}
        <div className="pin-detail-right" style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
          
          <div className="pin-detail-right-header">
            <button className="back-arrow-btn" onClick={() => navigate(-1)}>←</button>
            <button 
              className={`save-btn ${pin.saved ? 'saved' : ''}`}
              style={{ position: 'static', opacity: 1 }}
              onClick={() => onToggleSave(pin.id)}
            >
              {pin.saved ? 'Сохранено' : 'Сохранить'}
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

          {/* ПОХОЖИЕ КАРТИНКИ (ТОЛЬКО ЭТА КАТЕГОРИЯ) */}
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