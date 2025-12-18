// src/components/ui/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Верхняя часть с лого и навигацией */}
      <div className="sidebar-top">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          CW
        </div>
        
        <div 
          className={`nav-icon ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          🏠
        </div>
        
        <div 
          className={`nav-icon ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          👤
        </div>
      </div>

      {/* ШЕСТЕРЕНКА ВНИЗУ — ТЕПЕРЬ ВЫХОД */}
      <div className="sidebar-bottom" style={{ marginTop: 'auto' }}>
        <div 
          className="nav-icon" 
          onClick={handleLogout}
          title="Выйти"
          style={{ 
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--pink)'}
          onMouseOut={(e) => e.target.style.color = '#9ca3af'}
        >
          ⚙️
        </div>
      </div>
    </aside>
  );
}