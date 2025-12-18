// src/layout/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import Topbar from '../components/ui/Topbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout" style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#0f0f0f' // Принудительно ставим темный цвет
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ padding: '20px', flex: 1, color: 'white' }}>
          {/* Если здесь пусто, значит children не передаются */}
          {children || <h2>Контент не передан в Layout</h2>}
        </main>
      </div>
    </div>
  );
}