import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, openLogin } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) {
    return (
      <button type="button" onClick={openLogin} className="login-nav-btn">
        Войти
      </button>
    );
  }

  return (
    <div className="user-profile">
      <div
        className="avatar"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <img src={user.avatar} alt="Avatar" />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-user-name">
            {user.name}
            <br />
            <span className="dropdown-user-handle">{user.username}</span>
          </div>
          <hr />
          <Link to="/profile/saved" className="profile-link" onClick={() => setIsOpen(false)}>
            Мои сохранения
          </Link>
          <button type="button" onClick={handleLogout} className="logout-btn">
            Выход
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
