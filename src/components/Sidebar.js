import React from 'react';

// 1. ВОЗВРАЩАЕМ ИМПОРТЫ ТВОИХ ИКОНОК ИЗ ПАПКИ ASSETS
// (Убедись, что файлы с такими именами всё еще лежат в src/assets)
import logoIcon from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import addIcon from '../assets/add.png'; // Иконка плюсика
import messageIcon from '../assets/message.png';
import bellIcon from '../assets/bell.png';
import settingsIcon from '../assets/settings.png';

// 2. ПРИНИМАЕМ ПРОПС onOpenForm (пульт управления формой из App.js)
function Sidebar({ onOpenForm }) {

  // Оставляем плавный скролл наверх по клику на лого (полезная фича для защиты)
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="sidebar">
      
      {/* --- ВЕРХНЯЯ ЧАСТЬ --- */}
      <div className="sidebar-top">
        
        {/* 1. Логотип - используем твой logoIcon */}
        <div className="logo-btn" onClick={handleLogoClick} title="На главную">
           <img src={logoIcon} alt="Logo" width="32" />
        </div>
        
        {/* 2. Главная - используем твой homeIcon */}
        <button className="icon-btn active" title="Главная">
           <img src={homeIcon} alt="Home" width="24" />
        </button>

        {/* 3. Создать - ТВОЯ ИКОНКА ПЛЮСИКА И НАШЕ НОВОЕ СОБЫТИЕ */}
        <button 
          className="icon-btn" 
          title="Создать пин" 
          onClick={onOpenForm} // <-- Важно! Присоединяем функцию открытия формы к твоей иконке!
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

      {/* --- НИЖНЯЯ ЧАСТЬ --- */}
      <div className="sidebar-bottom">

        <button className="icon-btn" title="Настройки">
           <img src={settingsIcon} alt="Settings" width="24" />
        </button>

      </div>
      
    </aside>
  );
}

export default Sidebar;