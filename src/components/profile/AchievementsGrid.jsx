// src/components/profile/AchievementsGrid.jsx

export default function AchievementsGrid({ data }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: 30 }}>
            {data.map((ach, i) => (
                <div 
                    key={i} 
                    className={`achievement-card ${ach.color} ${ach.unlocked ? 'unlocked' : ''}`}
                >
                    {ach.unlocked && <div className="unlocked-label">UNLOCKED!</div>}
                    <div className="icon-placeholder" style={{color: `var(--${ach.color})`}}>{ach.icon}</div>
                    <div>
                        <div className="title" style={{color: `var(--${ach.color})`}}>{ach.title}</div>
                        <div className="description">{ach.description}</div>
                        <div className="date">{ach.date}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}