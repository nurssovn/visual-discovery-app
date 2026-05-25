import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Такой страницы не существует или она была удалена.</p>
      <Link to="/" className="not-found-link">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFound;
