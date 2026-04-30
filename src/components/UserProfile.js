import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Берем контекст

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, openLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  // Если юзера нет, показываем кнопку "Войти" вместо аватарки
  if (!user) {
   return (
    <button 
      onClick={openLogin} // <--- ВЫЗЫВАЕМ ОТКРЫТИЕ МОДАЛКИ
      className="login-nav-btn"
      style={{ padding: '10px 18px', background: '#e60023', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold' }}
    >
      Войти
    </button>
   );
  }

  // Если юзер есть, показываем аватарку и меню
  return (
    <div className="user-profile">
      <div className="avatar" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
        <img src={user.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div style={{ padding: '10px', fontWeight: 'bold' }}>
            {user.name} <br/>
            <span style={{ fontSize: '12px', color: 'gray' }}>{user.username}</span>
          </div>
          <hr style={{ margin: '5px 0' }}/>
          <Link 
            to="/profile" 
            className="dropdown-item profile-link"
            onClick={() => setIsOpen(false)}
            style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'inherit' }}
          >
            Мои сохранения
          </Link>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '10px', marginTop: '5px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;