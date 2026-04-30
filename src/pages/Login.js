import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true); // true = Вход, false = Регистрация
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // Стейт для показа ошибок

  const { login, register, closeLogin } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(''); // Очищаем старые ошибки

    if (!name.trim() || !password.trim()) {
      setErrorMsg('Пожалуйста, заполните все поля!');
      return;
    }

    let result;
    if (isLoginMode) {
      result = login(name, password); // Пытаемся войти
    } else {
      result = register(name, password); // Пытаемся зарегистрироваться
    }

    // Если функция вернула success: true - закрываем окно
    if (result.success) {
      closeLogin();
    } else {
      // Иначе показываем ошибку (Неверный пароль, или Юзер существует)
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={closeLogin}>
      <div className="login-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <button className="login-modal-close" onClick={closeLogin}>✕</button>

        <div className="login-modal-icon">👁️‍🗨️</div>
        <h2 className="login-modal-title">Visual Discovery App</h2>
        
        <p className="login-modal-desc" style={{ marginBottom: '15px' }}>
          {isLoginMode ? 'С возвращением! Введите данные для входа.' : 'Создайте аккаунт, чтобы разблокировать все функции!'}
        </p>

        {/* Вывод ошибки красным цветом */}
        {errorMsg && <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="login-modal-form">
          <input 
            type="text" 
            placeholder="Ваше имя" 
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-modal-input"
          />
          <input 
            type="password" 
            placeholder="Ваш пароль" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-modal-input"
          />
          <button type="submit" className="login-modal-btn">
            {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        {/* Переключатель Вход/Регистрация */}
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          {isLoginMode ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span 
            onClick={() => { setIsLoginMode(!isLoginMode); setErrorMsg(''); }}
            style={{ color: '#e60023', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            {isLoginMode ? 'Создать' : 'Войти'}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;