import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate

export default function Login() {
  const navigate = useNavigate(); // Инициализируем навигацию

  const handleLogin = (e) => {
    e.preventDefault();
    // Здесь обычно идет проверка логина/пароля
    // Если всё ок, переходим на дашборд:
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-text">CTRL+WIN</div>
          <p>С возвращением, боец!</p>
        </div>

        {/* Привязываем функцию handleLogin к форме */}
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" required />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="button-profile auth-button">
            Войти в систему
          </button>
        </form>

        <div className="auth-footer">
          Нет аккаунта? 
          <Link to="/register" className="auth-link">Создать сейчас</Link>
        </div>
      </div>
    </div>
  );
}