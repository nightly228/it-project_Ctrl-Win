// src/components/profile/ProfileProgress.jsx
// Это компонент для вкладки "ОБЗОР"

export default function ProfileProgress() {
    return (
        <div className="grid-2" style={{marginTop: 30}}>
            <div className="card purple" style={{height: 200}}>
                <h3>Прогресс Уровня</h3>
                <p style={{color: '#9ca3af'}}>Здесь будут дашборды прогресса уровня и активности, как на скриншоте дашборда.</p>
            </div>
            <div className="card cyan" style={{height: 200}}>
                <h3>Активность</h3>
                <p style={{color: '#9ca3af'}}>Дашборд активности за последние 7 дней.</p>
            </div>
        </div>
    );
}