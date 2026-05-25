import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PinDetail() {
  const { pins, isLoading, error, handleToggleSave } = useContext(AppContext);
  const { user } = useAuthContext();

  const { id } = useParams();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="page-message">Загрузка...</div>;
  }

  if (error) {
    return <div className="page-message page-status--error">{error}</div>;
  }

  const pin = pins.find((p) => String(p.id) === String(id));

  if (!pin) {
    return (
      <div className="page-message">
        <p>Пин не найден</p>
        <button type="button" className="login-nav-btn" onClick={() => navigate('/')}>
          На главную
        </button>
      </div>
    );
  }

  const relatedPins = pins
    .filter(
      (p) => p.category === pin.category && String(p.id) !== String(pin.id) && p.image
    )
    .slice(0, 6);

  const isSavedByMe = pin.savedBy && user && pin.savedBy.includes(user.username);

  return (
    <div className="pin-detail-page">
      <div className="pin-detail-card">
        <div className="pin-detail-left">
          <img src={pin.image} alt={pin.title} className="main-pin-image" />
        </div>

        <div className="pin-detail-right">
          <div className="pin-detail-right-header">
            <button type="button" className="back-arrow-btn" onClick={() => navigate(-1)}>
              ←
            </button>
            <button
              type="button"
              className={`save-btn ${isSavedByMe ? 'saved' : ''} save-btn--static`}
              onClick={() => handleToggleSave(pin.id)}
            >
              {isSavedByMe ? 'Сохранено' : 'Сохранить'}
            </button>
          </div>

          <h1 className="pin-detail-title">{pin.title}</h1>
          <p className="pin-detail-category">Категория: {pin.category}</p>
          {pin.description && <p className="pin-detail-description">{pin.description}</p>}

          <div className="related-section">
            <p className="related-title">
              {relatedPins.length > 0
                ? `Похожее из ${pin.category}`
                : 'Похожих пинов пока нет'}
            </p>
            {relatedPins.length > 0 && (
              <div className="related-mini-grid">
                {relatedPins.map((item) => (
                  <Link key={item.id} to={`/pin/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <p className="feature-soon-hint">Комментарии появятся в следующей версии</p>
        </div>
      </div>
    </div>
  );
}

export default PinDetail;
