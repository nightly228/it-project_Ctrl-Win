import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', marginBottom: '40px' }}>CW</div>
        
        {/* Главная */}
        <div className={`nav-icon ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')} title="Дашборд">🏠</div>
        
        {/* Профиль */}
        <div className={`nav-icon ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')} title="Профиль">👤</div>
        
        {/* ТЕСТОВАЯ ИКОНКА ТУРНИРА */}
        <div className={`nav-icon ${location.pathname.includes('/tournament') ? 'active' : ''}`} onClick={() => navigate('/tournament/1')} title="Турнир">🏆</div>
      </div>
      
      <div className="sidebar-bottom" style={{ marginTop: 'auto', marginBottom: '20px' }}>
        <div 
          className={`nav-icon ${location.pathname === '/settings' ? 'active' : ''}`} 
          onClick={() => navigate('/settings')} 
          title="Настройки" 
          style={{ cursor: 'pointer' }}
        >
          ⚙️
        </div>
      </div>
    </aside>
  );
}