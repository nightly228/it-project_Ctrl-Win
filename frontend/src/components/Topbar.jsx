// src/components/Topbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate

export default function Topbar({ isProfilePage }) {
    const navigate = useNavigate(); // Инициализируем навигацию
    
    const buttonText = isProfilePage ? 'DASHBOARD' : 'PROFILE';
    const targetPath = isProfilePage ? '/dashboard' : '/profile';

    // Функция для выхода
    const handleLogout = () => {
        // Здесь можно добавить очистку localStorage, если она будет
        navigate('/login');
    };

    return (
        <div className="topbar">
            {/* ЛОГОТИП (CTRL+WIN) */}
            <div style={{
                fontSize: 28,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '2px'
            }}>
                CTRL+WIN
            </div>

            <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* КНОПКА ПЕРЕХОДА (PROFILE / DASHBOARD) */}
                <Link to={targetPath} className="button-profile" style={{ textDecoration: 'none' }}>
                    {buttonText}
                </Link>

                {/* КНОПКА ВЫХОДА */}
                <button 
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--pink)',
                        color: 'var(--pink)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = 'var(--pink)';
                        e.target.style.color = 'black';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--pink)';
                    }}
                >
                    ВЫЙТИ
                </button>
            </div>
        </div>
    );
}