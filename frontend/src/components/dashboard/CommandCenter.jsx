// src/components/dashboard/CommandCenter.jsx

export default function CommandCenter() {
  return (
    <div className="card command-center">
      <h1
        style={{
          fontSize: 48,
          fontWeight: 800,
          background: "linear-gradient(90deg, #22d3ee, #ec4899)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          margin: 0
        }}
      >
        COMMAND CENTER
      </h1>
      <p style={{ color: "#9ca3af", marginTop: 8, fontSize: 16 }}>
        Управляй турнирами как профессионал
      </p>
    </div>
  );
}
