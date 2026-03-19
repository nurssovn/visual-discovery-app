import React, { useState } from 'react';

function UserProfile() {
  // Используем состояние, чтобы меню открывалось и закрывалось
  const [isOpen, setIsOpen] = useState(false);

  // Событие 3: Клик по аватарке открывает/закрывает меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile">
      <div className="avatar" onClick={toggleMenu}>
        <img src="https://i.pinimg.com/736x/0b/1f/52/0b1f52bada4d356515aff0a2d5d2b6f0.jpg" alt="Avatar" />
      </div>
      
      {/* Если isOpen === true, показываем меню */}
      {isOpen && (
        <div className="dropdown-menu">
          <p>username: <b>@lunassi</b></p>
          <hr />
          <button onClick={() => alert('Выход из аккаунта')}>Выход</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;