import React from 'react';
import { NavLink } from 'react-router-dom'; // Добавили для работы ссылок

// 1. ИМПОРТЫ ТВОИХ ИКОНОК
import logoIcon from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import addIcon from '../assets/add.png';
import messageIcon from '../assets/message.png';
import bellIcon from '../assets/bell.png';
import settingsIcon from '../assets/settings.png';

// 2. ПРИНИМАЕМ ПРОПСЫ: onOpenForm, theme и toggleTheme (обязательно в скобках {})
function Sidebar({ onOpenForm, theme, toggleTheme }) {

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="sidebar">
      
      <div className="sidebar-top">
        {/* Логотип */}
        <NavLink to="/" className="logo-btn" onClick={handleLogoClick} title="На главную">
           <img src={logoIcon} alt="Logo" width="32" />
        </NavLink>
        
        {/* Главная */}
        <NavLink to="/" className={({ isActive }) => isActive ? "icon-btn active" : "icon-btn"} title="Главная">
           <img src={homeIcon} alt="Home" width="24" />
        </NavLink>

        {/* Создать пин (Кнопка) */}
        <button 
          className="icon-btn" 
          title="Создать пин" 
          onClick={onOpenForm}
        >
           <img src={addIcon} alt="Создать" width="24" />
        </button>
        
        <button className="icon-btn" title="Сообщения">
           <img src={messageIcon} alt="Messages" width="24" />
        </button>

        <button className="icon-btn" title="Уведомления">
           <img src={bellIcon} alt="Notifications" width="24" />
        </button>
      </div>

      <div className="sidebar-bottom">
        {/* КНОПКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ (Исправлено) */}
        <button className="icon-btn" onClick={toggleTheme} title="Сменить тему">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <button className="icon-btn" title="Настройки">
           <img src={settingsIcon} alt="Settings" width="24" />
        </button>
      </div>
      
    </aside>
  );
}

export default Sidebar;