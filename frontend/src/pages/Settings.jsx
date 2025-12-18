import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

export default function Settings() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [userData, setUserData] = useState({
    nickname: 'Gamer_One',
    location: 'Kazakhstan',
    avatar: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserData({ ...userData, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="settings-page fade-in" style={{ color: 'white', padding: '40px' }}>
        <h2 style={{ marginBottom: '30px', letterSpacing: '2px' }}>НАСТРОЙКИ ПРОФИЛЯ</h2>
        
        <div style={{ background: 'var(--panel)', padding: '30px', borderRadius: '15px', border: '1px solid var(--border)', maxWidth: '500px' }}>
          
          {/* АВАТАР */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div 
              onClick={() => fileInputRef.current.click()}
              style={{ 
                width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 15px',
                background: 'var(--bg)', border: '2px dashed var(--purple)', cursor: 'pointer',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {userData.avatar ? <img src={userData.avatar} alt="ava" style={{width:'100%'}}/> : <span>+</span>}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{display:'none'}} />
            <button className="auth-link" style={{background:'none', border:'none', cursor:'pointer'}} onClick={() => fileInputRef.current.click()}>Изменить фото</button>
          </div>

          {/* ПОЛЯ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af' }}>НИКНЕЙМ</label>
              <input 
                type="text" 
                value={userData.nickname} 
                onChange={(e) => setUserData({...userData, nickname: e.target.value})}
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px', color: 'white', borderRadius: '5px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af' }}>ЛОКАЦИЯ</label>
              <input 
                type="text" 
                value={userData.location} 
                onChange={(e) => setUserData({...userData, location: e.target.value})}
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px', color: 'white', borderRadius: '5px', marginTop: '5px' }}
              />
            </div>
            
            <button className="button-profile" style={{ marginTop: '10px' }}>СОХРАНИТЬ</button>
          </div>

          {/* ВЫХОД */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: 'var(--pink)', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
            >
              ВЫЙТИ ИЗ АККАУНТА
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}