import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';

export default function TournamentView() {
  const [activeTab, setActiveTab] = useState('overview');

  // Моковые данные для фронтенда
  const tournament = {
    name: "SUMMER CYBER MAJOR 2025",
    game: "Counter-Strike 2",
    prize: "$5,000",
    status: "РЕГИСТРАЦИЯ",
    date: "25 ИЮНЯ, 18:00",
    teams: 12,
    maxTeams: 16
  };

  return (
    <DashboardLayout>
      <div className="tournament-view fade-in" style={{ padding: '30px', color: 'white' }}>
        
        {/* ВЕРХНИЙ БАННЕР */}
        <div className="tournament-header" style={{
          background: 'linear-gradient(90deg, var(--purple) 0%, #4b0082 100%)',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '30px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ background: 'var(--pink)', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
              {tournament.status}
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: '900', marginTop: '15px', letterSpacing: '2px' }}>{tournament.name}</h1>
            <p style={{ opacity: 0.8, fontSize: '18px' }}>{tournament.game} • {tournament.date}</p>
          </div>
          {/* Декоративный элемент на фоне */}
          <div style={{ position: 'absolute', right: '-50px', top: '-50px', fontSize: '200px', opacity: 0.1, fontWeight: '900' }}>CW</div>
        </div>

        {/* ПАНЕЛЬ С КРАТКОЙ ИНФО */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'ПРИЗОВОЙ ФОНД', value: tournament.prize, color: 'var(--cyan)' },
            { label: 'УЧАСТНИКИ', value: `${tournament.teams} / ${tournament.maxTeams}`, color: 'white' },
            { label: 'ФОРМАТ', value: 'Single Elim', color: 'white' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '5px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: item.color }}>{item.value}</div>
            </div>
          ))}
          <button className="button-profile" style={{ height: '100%', fontSize: '16px', background: 'var(--purple)' }}>
            ПОДАТЬ ЗАЯВКУ
          </button>
        </div>

        {/* ТАБЫ (ПЕРЕКЛЮЧАТЕЛИ) */}
        <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid var(--border)', marginBottom: '30px' }}>
          {['ОБЗОР', 'СЕТКА', 'УЧАСТНИКИ', 'ПРАВИЛА'].map((tab) => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{
                padding: '10px 0',
                cursor: 'pointer',
                color: activeTab === tab.toLowerCase() ? 'var(--cyan)' : '#9ca3af',
                borderBottom: activeTab === tab.toLowerCase() ? '2px solid var(--cyan)' : 'none',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* КОНТЕНТ ТАБОВ */}
        <div style={{ background: 'var(--panel)', padding: '30px', borderRadius: '15px', border: '1px solid var(--border)', minHeight: '300px' }}>
          {activeTab === 'обзор' && (
            <div>
              <h3>О турнире</h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                Приготовьтесь к самому масштабному событию этого лета! Лучшие команды сразятся за титул чемпиона и призовой фонд в {tournament.prize}. 
                Турнир пройдет в формате онлайн с финалом в прямом эфире.
              </p>
            </div>
          )}
          {activeTab === 'сетка' && (
            <div style={{ textAlign: 'center', padding: '50px', color: '#9ca3af' }}>
              Сетка будет сформирована после завершения регистрации.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}