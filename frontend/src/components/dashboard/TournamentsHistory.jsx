// src/components/dashboard/TournamentsHistory.jsx

export default function TournamentsHistory({ data, onTournamentClick }) {
  
  // Функция для красивого форматирования даты
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    
    const date = new Date(dateString);
    
    // Проверка на валидность даты
    if (isNaN(date.getTime())) return dateString; 

    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short', // "мая", "июн."
      year: "numeric",
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="card purple" style={{ padding: '30px 20px' }}>
      <h3 style={{ marginBottom: 16 }}>История турниров</h3>

      <table className="tournaments-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Название</th>
            <th style={{ width: '20%' }}>Дата</th> {/* Увеличили немного ширину для даты */}
            <th style={{ width: '15%' }}>Игроки</th>
            <th style={{ width: '20%' }}>Статус</th>
            <th style={{ width: '15%', textAlign: 'right' }}>Доход</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr 
              key={t.id || i} 
              onClick={() => onTournamentClick(t.id || i)} 
              style={{ cursor: 'pointer' }}
              className="tournament-row"
            >
              <td style={{ fontWeight: 'bold', color: 'var(--cyan)' }}>
                {t.name || "Без названия"}
              </td>
              
              {/* КРАСИВАЯ ДАТА */}
              <td style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {formatDate(t.start_time)}
              </td>

              <td className="participants-count">
                <span style={{ color: 'var(--text-main)' }}>{t.current_players || 0}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}> / {t.max_players || 0}</span>
              </td>

              <td>
                <span className={`status-badge ${t.status?.toLowerCase()}`}>
                  {t.status}
                </span>
              </td>

              <td className="revenue-amount" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {t.revenue ? `${t.revenue} ₽` : "0 ₽"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}