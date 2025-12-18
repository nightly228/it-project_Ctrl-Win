// src/components/dashboard/CalendarBlock.jsx

export default function CalendarBlock({ data }) {
  return (
    <div className="card yellow">
      <h3 style={{ marginBottom: 10 }}>Календарь</h3>
      {data.map((item, i) => (
        <div key={i} className="calendar-item">
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div className="time" style={{ color: item.status === 'today' ? 'var(--yellow)' : '#9ca3af' }}>
            {item.time}
          </div>
        </div>
      ))}
    </div>
  );
}