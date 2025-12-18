import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавляем useNavigate

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Создаем функцию для перехода

  const handleRegister = (e) => {
    e.preventDefault(); // 1. ОСТАНАВЛИВАЕМ перезагрузку страницы

    // 2. Простая проверка паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают!');
      return;
    }

    setError('');
    console.log("Регистрация успешна!");

    // 3. ПЕРЕХОДИМ на главную страницу (Дашборд)
    navigate('/dashboard'); 
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="logo-text">CTRL+WIN</div>
          <p>Регистрация нового аккаунта</p>
        </div>

        {/* Привязываем функцию handleRegister к событию onSubmit */}
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Никнейм</label>
            <input type="text" placeholder="Gamer_One" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" required />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Повторите пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderColor: error ? 'var(--pink)' : 'var(--border)' }}
              required 
            />
            {error && <p style={{ color: 'var(--pink)', fontSize: '12px', marginTop: '5px' }}>{error}</p>}
          </div>

          <button type="submit" className="button-profile auth-button">
            Начать игру
          </button>
        </form>

        <div className="auth-footer">
          Уже есть аккаунт? 
          <Link to="/login" className="auth-link">Войти</Link>
        </div>
      </div>
    </div>
  );
}