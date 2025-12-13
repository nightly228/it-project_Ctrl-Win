// src/components/profile/ProfileStats.jsx
// Это компонент для вкладки "СТАТИСТИКА"

export default function ProfileStats() {
    return (
        <div className="grid-2" style={{marginTop: 30}}>
            <div className="card yellow" style={{height: 300}}>
                <h3>Статистика Турниров</h3>
                <p style={{color: '#9ca3af'}}>Здесь будут дашборды со статистикой, как на скриншотах.</p>
            </div>
            <div className="card pink" style={{height: 300}}>
                <h3>Финансовая Статистика</h3>
                <p style={{color: '#9ca3af'}}>Графики доходов и расходов.</p>
            </div>
        </div>
    );
}