import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

function Login({ onClose: onCloseProp }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login, register, closeLogin } = useAuthContext();
  const close = onCloseProp || closeLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !password.trim()) {
      setErrorMsg('Пожалуйста, заполните все поля!');
      return;
    }

    const result = isLoginMode ? login(name, password) : register(name, password);

    if (result.success) {
      close();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={close}>
      <div className="login-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="login-modal-close" onClick={close}>
          ✕
        </button>

        <div className="login-modal-icon">V</div>
        <h2 className="login-modal-title">Visual Discovery App</h2>

        <p className="login-modal-desc">
          {isLoginMode
            ? 'С возвращением! Введите данные для входа.'
            : 'Создайте аккаунт, чтобы сохранять пины и открывать профиль.'}
        </p>

        {errorMsg && <p className="login-modal-error">{errorMsg}</p>}

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

        <p className="login-modal-switch">
          {isLoginMode ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span
            className="login-modal-switch-link"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg('');
            }}
          >
            {isLoginMode ? 'Создать' : 'Войти'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
