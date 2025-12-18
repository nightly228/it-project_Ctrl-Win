import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Импортируем authApi и apiUtils для обработки ошибок
import { authApi, apiUtils } from '../global/api'; 

export default function Register() {
  // Добавляем стейты для ника и почты
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают!');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      const userData = {
        name: username,
        email: email,
        password: password
      };

      // Вызываем обновленный метод
      const response = await authApi.register(userData);

      console.log("Регистрация и вход успешны:", response);
      
      // Сразу отправляем в личный кабинет, так как токен уже в localStorage
      navigate('/dashboard'); 

    } catch (err) {
      const message = apiUtils.handleError(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="logo-text">CTRL+WIN</div>
          <p>Регистрация нового аккаунта</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          {/* Вывод общей ошибки API */}
          {error && <div className="error-banner" style={{ color: 'var(--pink)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

          <div className="form-group">
            <label>Никнейм</label>
            <input 
              type="text" 
              placeholder="Gamer_One" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
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
          <div className="form-group">
            <label>Повторите пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderColor: error && password !== confirmPassword ? 'var(--pink)' : 'var(--border)' }}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="button-profile auth-button"
            disabled={isLoading} // Блокируем кнопку при загрузке
          >
            {isLoading ? 'Регистрация...' : 'Начать игру'}
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