import React, { useState } from 'react'; // Добавили useState
import { Link, useNavigate } from 'react-router-dom';
import { authApi, apiUtils } from '../global/api'; // Импортируем наше API

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Отправляем данные на бэкенд
      const response = await authApi.login(email, password);
      
      // 2. Если логин успешен, токен уже сохранился в localStorage 
      // благодаря логике внутри authApi.login в твоем api.js
      console.log('Вход выполнен:', response);
      
      // 3. Переходим на дашборд
      navigate('/dashboard');
    } catch (err) {
      // 4. Обрабатываем ошибки (неверный пароль, сеть и т.д.)
      const message = apiUtils.handleError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-text">CTRL+WIN</div>
          <p>С возвращением, боец!</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {/* Вывод ошибки, если она есть */}
          {error && (
            <div style={{ color: 'var(--pink)', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="example@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
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

          <button 
            type="submit" 
            className="button-profile auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти в систему'}
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