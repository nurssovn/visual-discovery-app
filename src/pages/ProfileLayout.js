import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function ProfileLayout() {
  return (
    <div className="profile-container" style={{ padding: '80px 20px' }}>
      <div className="profile-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#ddd', margin: '0 auto' }}></div>
        <h1>Имя Пользователя</h1>
        <nav>
          <Link to="/profile/saved" style={{ margin: '0 10px', textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Сохраненные</Link>
          {/* Сюда можно будет добавить "Созданные" в будущем */}
        </nav>
      </div>
      {/* Сюда роутер подставит SavedPins */}
      <Outlet />
    </div>
  );
}
export default ProfileLayout;