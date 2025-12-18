// src/pages/CreateTournament.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

export default function CreateTournament() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  return (
    <DashboardLayout>
      <div style={{ padding: '40px' }}>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>СОЗДАНИЕ ТУРНИРА</h1>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px' }}>
          <input 
            type="text" 
            placeholder="Название турнира" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '15px', 
              background: '#1a1a1a', 
              border: '1px solid #333', 
              color: 'white',
              borderRadius: '8px',
              marginBottom: '20px'
            }} 
          />
          <button 
            className="button-profile" 
            onClick={() => { alert('Создано!'); navigate('/dashboard'); }}
            style={{ width: '100%', height: '50px', cursor: 'pointer' }}
          >
            ОПУБЛИКОВАТЬ
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}