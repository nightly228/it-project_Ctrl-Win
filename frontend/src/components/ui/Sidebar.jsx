// src/components/ui/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Используем Link для навигации

export default function Sidebar() {
    // В реальном приложении здесь была бы логика для активного состояния
    const currentPath = window.location.pathname;

    return (
        <div className="sidebar">
            <div className="logo">CTRL+WIN</div>
            <Link to="/dashboard" className={`nav-icon ${currentPath === '/dashboard' ? 'active' : ''}`} title="Dashboard">
                <span role="img" aria-label="dashboard">🏠</span>
            </Link>
            <Link to="/profile" className={`nav-icon ${currentPath === '/profile' ? 'active' : ''}`} title="Profile">
                <span role="img" aria-label="profile">👤</span>
            </Link>
            {/* Дополнительные иконки по скриншоту */}
            <div className="nav-icon" title="Stats"><span role="img" aria-label="stats">⭐</span></div>
            <div className="nav-icon" title="Tournaments"><span role="img" aria-label="tournaments">🏆</span></div>
            <div className="nav-icon" title="Settings" style={{marginTop: 'auto', marginBottom: 20}}>
                <span role="img" aria-label="settings">⚙️</span>
            </div>
        </div>
    );
}