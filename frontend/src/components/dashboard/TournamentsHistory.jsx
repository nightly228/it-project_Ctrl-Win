// src/components/dashboard/TournamentsHistory.jsx

export default function TournamentsHistory({ data, onTournamentClick }) {
  return (
    <div className="card purple" style={{ padding: '30px 20px' }}>
      <h3 style={{ marginBottom: 16 }}>История турниров</h3>

      <table className="tournaments-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Название</th>
            <th style={{ width: '15%' }}>Дата</th>
            <th style={{ width: '20%' }}>Участники</th>
            <th style={{ width: '20%' }}>Подтверждено</th>
            <th style={{ width: '15%', textAlign: 'right' }}>Доход</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr 
              key={i} 
              // Добавляем ID турнира (если его нет в mockData, используй i)
              onClick={() => onTournamentClick(t.id || i)} 
              style={{ cursor: 'pointer', transition: 'background 0.2s' }}
              className="tournament-row"
            >
              <td style={{ fontWeight: 'bold', color: 'var(--cyan)' }}>{t.name}</td>
              <td>{t.date}</td>
              <td className="participants-count">{t.participants}</td>
              <td>{t.confirmed}</td>
              <td className="revenue-amount" style={{ textAlign: 'right' }}>{t.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}