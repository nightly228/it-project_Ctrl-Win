// src/components/profile/ProfileHeader.jsx
// ИСПРАВЛЕННЫЙ КОД: Блок .profile-tabs УДАЛЕН.

export default function ProfileHeader({ data }) {
    return (
        <div className="profile-header">
            <div className="profile-avatar-container">
                <div className="avatar">
                    <span role="img" aria-label="person">👤</span>
                    <div className="avatar-level">LVL {data.level || 0}</div>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                        {data.pro && <span className="unlocked-label" style={{position: 'static', marginRight: 10, transform: 'none', background: 'linear-gradient(90deg, #a855f7, #ec4899)', clipPath: 'none', color: 'white', padding: '2px 8px'}}>PRO!</span>}
                        <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>{data.name}</h2>
                    </div>
                    <p style={{ color: '#9ca3af', margin: 0, fontSize: 16 }}>{data.role || "Пользователь"}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 40, marginTop: 20, fontSize: 14 }}>
                <div style={{ color: 'var(--cyan)' }}>📧 {data.email}</div>
                <div style={{ color: 'var(--pink)' }}>📍 {data.location || "Тёмная лошадка"}</div>
                <div style={{ color: 'var(--yellow)' }}>🗓️ {data.daysOnline || 1} дней на платформе</div>
            </div>

            <div className="profile-stats-grid">
                <div className="profile-stat-box" style={{border: '1px solid var(--purple)'}}>
                    <div className="icon" style={{color: 'var(--purple)'}}>🏆</div>
                    <div style={{fontWeight: 700}}>{data.totalTournaments || 0}</div>
                    <div style={{fontSize: 12, color: '#9ca3af'}}>Турниров</div>
                </div>
                <div className="profile-stat-box" style={{border: '1px solid var(--yellow)'}}>
                    <div className="icon" style={{color: 'var(--yellow)'}}>⭐</div>
                    <div style={{fontWeight: 700}}>{data.rating || 4}</div>
                    <div style={{fontSize: 12, color: '#9ca3af'}}>Рейтинг</div>
                </div>
                <div className="profile-stat-box" style={{border: '1px solid #10b981'}}>
                    <div className="icon" style={{color: '#10b981'}}>💰</div>
                    <div style={{fontWeight: 700}}>{data.revenue || 0}</div>
                    <div style={{fontSize: 12, color: '#9ca3af'}}>Доход</div>
                </div>
                <div className="profile-stat-box" style={{border: '1px solid var(--cyan)'}}>
                    <div className="icon" style={{color: 'var(--cyan)'}}>📈</div>
                    <div style={{fontWeight: 700}}>+12%</div>
                    <div style={{fontSize: 12, color: '#9ca3af'}}>Прогресс</div>
                </div>
            </div>

            {/* Блок вкладок profile-tabs был здесь и УДАЛЕН. 
            Теперь рабочая панель вкладок берется из компонента Profile.jsx */}
        </div>
    );
}