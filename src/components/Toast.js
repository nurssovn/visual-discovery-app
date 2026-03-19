import React from 'react';

// Компонент принимает message как проп
function Toast({ message }) {
  // Если сообщения нет, ничего не рендерим
  if (!message) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
}

export default Toast;