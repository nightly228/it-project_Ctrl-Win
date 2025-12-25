import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
// Импортируем наш новый интерактивный конструктор
import SmartBracket from '../components/dashboard/SmartBracket'; 

export default function TournamentView() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <div style={{ padding: '30px', color: 'white' }}>
        <h1 style={{ marginBottom: '20px', letterSpacing: '1px' }}>SUMMER CYBER MAJOR 2025</h1>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #333' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ 
              padding: '10px 20px', background: 'none', border: 'none', 
              color: activeTab === 'overview' ? '#00f2ff' : '#888', 
              cursor: 'pointer', borderBottom: activeTab === 'overview' ? '2px solid #00f2ff' : 'none',
              fontWeight: 'bold', transition: '0.3s'
            }}
          >
            ОБЗОР
          </button>
          <button 
            onClick={() => setActiveTab('bracket')}
            style={{ 
              padding: '10px 20px', background: 'none', border: 'none', 
              color: activeTab === 'bracket' ? '#00f2ff' : '#888', 
              cursor: 'pointer', borderBottom: activeTab === 'bracket' ? '2px solid #00f2ff' : 'none',
              fontWeight: 'bold', transition: '0.3s'
            }}
          >
            СХЕМА ТУРНИРА
          </button>
        </div>

        <div style={{ 
          background: '#161b22', 
          padding: '10px', 
          borderRadius: '12px', 
          border: '1px solid #30363d',
          minHeight: '650px' 
        }}>
          {activeTab === 'overview' && (
            <div style={{ padding: '20px' }}>
              <p>Добро пожаловать в панель управления турниром. Используйте вкладку "Схема", чтобы настроить этапы.</p>
            </div>
          )}
          
          {/* Заменяем старую сетку на интерактивную доску */}
          {activeTab === 'bracket' && <SmartBracket />}
        </div>
      </div>
    </DashboardLayout>
  );
}