// src/components/dashboard/OrganizerAchievements.jsx

export default function OrganizerAchievements({ data }) {
  return (
    <div className="card pink">
      <h3 style={{ marginBottom: 16 }}>Достижения</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div style={{fontSize: 14, color: '#9ca3af'}}>Уровень организатора</div>
          <div style={{fontSize: 24, fontWeight: 700}}>Level 12</div>
      </div>
      <div className="progress-bar-container" style={{height: 12}}>
        <div 
          className="progress-bar master" 
          style={{ width: '65%'}} 
        ></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <div style={{fontSize: 14, color: '#9ca3af'}}>65%</div>
        <div style={{fontSize: 14, color: '#9ca3af'}}></div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: 30 }}>
        {data.map((ach, i) => (
            <div key={i} style={{textAlign: 'center'}}>
                <div style={{fontSize: 30}}>{ach.icon}</div>
                <div style={{fontSize: 14, fontWeight: 700, marginTop: 5}}>{ach.title}</div>
                <div style={{fontSize: 12, color: '#9ca3af'}}>{ach.subtitle}</div>
            </div>
        ))}
      </div>
    </div>
  );
}