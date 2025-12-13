// src/components/dashboard/Notifications.jsx

export default function Notifications({ data }) {
  const newCount = data.length;

  return (
    <div className="card pink">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Уведомления</h3>
        <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: "#9ca3af" }}>
          <span className="notification-count">{newCount} новых</span>
        </div>
      </div>
      {data.map((n, i) => (
        <div 
          key={i} 
          style={{ 
            marginTop: 18, 
            paddingBottom: 10,
            borderBottom: i < data.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: n.type === 'open' ? '#facc15' : '#22d3ee', 
                    marginRight: '8px' 
                }}></span>
                <div>{n.text}</div>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, marginLeft: '16px' }}>
                {n.time}
            </div>
          </div>
          <button className="button-open">ОТКРЫТЬ</button>
        </div>
      ))}
    </div>
  );
}