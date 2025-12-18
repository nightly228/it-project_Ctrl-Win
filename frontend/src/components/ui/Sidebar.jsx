import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', marginBottom: '40px' }}>CW</div>
        <div className={`nav-icon ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>🏠</div>
        <div className={`nav-icon ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>👤</div>
      </div>
      
      <div className="sidebar-bottom" style={{ marginTop: 'auto', marginBottom: '20px' }}>
        {/* ТЕПЕРЬ ВЕДЕТ В НАСТРОЙКИ */}
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