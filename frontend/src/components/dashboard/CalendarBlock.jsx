// src/components/dashboard/CalendarBlock.jsx

export default function CalendarBlock({ data }) {
  return (
    <div className="card yellow">
      <style>{`
        .calendar-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .calendar-item:last-child {
          border-bottom: none;
        }
        .calendar-info-right {
          text-align: right;
          font-size: 13px;
        }
        .calendar-date {
          color: white;
          font-weight: 500;
        }
        .calendar-time {
          color: #9ca3af;
          font-size: 11px;
        }
      `}</style>

      <h3 style={{ marginBottom: 15 }}>📅 Календарь турниров</h3>
      
      {data.length > 0 ? (
        data.map((item, i) => {
          // Преобразуем start_time в удобный формат
          const startDate = new Date(item.start_time);
          const formattedDate = startDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short'
          });
          const formattedTime = startDate.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div key={i} className="calendar-item">
              <div style={{ fontWeight: 600, color: 'white', maxWidth: '60%' }}>
                {item.name}
              </div>
              
              <div className="calendar-info-right">
                <div className="calendar-date">{formattedDate}</div>
                <div className="calendar-time" style={{ 
                  color: item.status === 'ongoing' ? 'var(--yellow)' : '#9ca3af' 
                }}>
                  {formattedTime}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ color: '#9ca3af', fontSize: 14 }}>Запланированных турниров нет</p>
      )}
    </div>
  );
}