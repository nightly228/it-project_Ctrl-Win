import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Topbar({ isProfilePage }) {
    const navigate = useNavigate();
    
    const buttonText = isProfilePage ? 'DASHBOARD' : 'PROFILE';
    const targetPath = isProfilePage ? '/dashboard' : '/profile';

    return (
        <div className="topbar" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '0 20px',
            height: '70px',
            background: 'var(--panel)' 
        }}>
            {/* ЛОГОТИП */}
            <div style={{
                fontSize: 28,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '2px',
                cursor: 'pointer'
            }} onClick={() => navigate('/dashboard')}>
                CTRL+WIN
            </div>

            <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                
                {/* КНОПКА: СОЗДАТЬ ТУРНИР */}
                <Link 
                    to="/create-tournament" 
                    className="button-profile" 
                    style={{ 
                        textDecoration: 'none', 
                        background: 'var(--purple)', 
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 'bold',
                        boxShadow: '0 0 15px rgba(138, 43, 226, 0.3)'
                    }}
                >
                    + ТУРНИР
                </Link>

                {/* КНОПКА ПЕРЕХОДА */}
                <Link to={targetPath} className="button-profile" style={{ 
                    textDecoration: 'none',
                    color: 'white',
                    padding: '8px 16px'
                }}>
                    {buttonText}
                </Link>

                {/* КНОПКА ВЫХОДА */}
                <button 
                    onClick={() => navigate('/login')}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--pink)',
                        color: 'var(--pink)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ВЫЙТИ
                </button>
            </div>
        </div>
    );
}