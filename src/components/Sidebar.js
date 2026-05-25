import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

import moonIcon from '../assets/moon.png';
import sunIconWhite from '../assets/sun-white.png';
import logoIconWhite from '../assets/logo.png';
import homeIconWhite from '../assets/home.png';
import addIconWhite from '../assets/add.png';
import messageIconWhite from '../assets/message.png';
import bellIconWhite from '../assets/bell.png';
import settingsIconWhite from '../assets/settings.png';
import logoIcon from '../assets/logo-white.png';
import homeIcon from '../assets/home-white.png';
import addIcon from '../assets/add-white.png';
import messageIcon from '../assets/message-white.png';
import bellIcon from '../assets/bell-white.png';
import settingsIcon from '../assets/settings-white.png';

function Sidebar({ onOpenForm, onComingSoon }) {
  const { theme, toggleTheme } = useContext(AppContext);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const soon = (feature) => () => onComingSoon(`${feature} — скоро будет доступно`);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <NavLink to="/" className="logo-btn" onClick={handleLogoClick} title="На главную">
          <img src={theme === 'dark' ? logoIconWhite : logoIcon} alt="Logo" width="32" />
        </NavLink>

        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'icon-btn active' : 'icon-btn')}
          title="Главная"
        >
          <img src={theme === 'dark' ? homeIconWhite : homeIcon} alt="Home" width="24" />
        </NavLink>

        <button type="button" className="icon-btn" title="Создать пин" onClick={onOpenForm}>
          <img src={theme === 'dark' ? addIconWhite : addIcon} alt="Создать" width="24" />
        </button>

        <button type="button" className="icon-btn" title="Сообщения" onClick={soon('Сообщения')}>
          <img src={theme === 'dark' ? messageIconWhite : messageIcon} alt="Messages" width="24" />
        </button>

        <button type="button" className="icon-btn" title="Уведомления" onClick={soon('Уведомления')}>
          <img src={theme === 'dark' ? bellIconWhite : bellIcon} alt="Notifications" width="24" />
        </button>
      </div>

      <div className="sidebar-bottom">
        <button type="button" className="icon-btn" onClick={toggleTheme} title="Сменить тему">
          <img src={theme === 'light' ? moonIcon : sunIconWhite} alt="Toggle theme" width="24" />
        </button>

        <button type="button" className="icon-btn" title="Настройки" onClick={soon('Настройки')}>
          <img src={theme === 'dark' ? settingsIconWhite : settingsIcon} alt="Settings" width="24" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
