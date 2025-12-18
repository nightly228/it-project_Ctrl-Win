// src/components/ui/StatCard.jsx

export default function StatCard({ title, value, delta, icon, color }) {
  const iconColorMap = {
    purple: "#a855f7",
    pink: "#ec4899",
    cyan: "#22d3ee",
    yellow: "#facc15",
  };

  return (
    <div className="card" style={{ borderColor: iconColorMap[color] }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 14, color: "#9ca3af" }}>{title}</div>
        <span style={{ fontSize: 20, color: iconColorMap[color] }}>{icon}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>{value}</div>
      {delta && (
        <div style={{ color: delta.includes('+') ? "#22c55e" : "#ef4444", fontSize: 13, marginTop: 4 }}>
          {delta}
        </div>
      )}
    </div>
  );
}