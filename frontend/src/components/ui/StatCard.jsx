// src/components/ui/StatCard.jsx

// ОШИБКА БЫЛА ЗДЕСЬ: нужно обернуть аргументы в { }, чтобы достать их из props
export default function StatCard({ label, value, subValue, icon, color }) {
  return (
    <div className="stat-card" style={{ 
      background: 'rgba(255, 255, 255, 0.05)', 
      padding: '20px', 
      borderRadius: '12px',
      borderLeft: `4px solid ${color || 'var(--purple)'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ fontSize: '20px' }}>{icon}</span>
      </div>
      
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
        {value}
      </div>

      {subValue && (
        <div style={{ fontSize: '11px', color: '#02ff52ff', marginTop: '4px' }}>
          {subValue}
        </div>
      )}
    </div>
  );
}