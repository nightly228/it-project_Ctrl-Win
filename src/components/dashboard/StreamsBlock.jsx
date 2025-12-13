// src/components/dashboard/StreamsBlock.jsx

export default function StreamsBlock({ data }) {
  return (
    <div className="card cyan">
      <h3 style={{ marginBottom: 20 }}>Трансляции матчей <span className="live-indicator">LIVE</span></h3>
      {data.map((m, i) => (
        <div 
          key={i} 
          style={{ 
            marginTop: i > 0 ? 18 : 0, 
            paddingBottom: i < data.length - 1 ? 18 : 0,
            borderBottom: i < data.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none"
          }}
        >
          <strong className="text-cyan" style={{ fontSize: 16 }}>{m.game}</strong>
          <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>{m.teams}</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            <span style={{ fontWeight: 600 }}>{m.viewers}</span> зрителей
          </div>
        </div>
      ))}
    </div>
  );
}