import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { tournamentApi, apiUtils } from '../global/api';

export default function CreateTournament() {
  const navigate = useNavigate();
  
  // Состояния для всех полей модели
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    type: '3v3',
    max_players: 16,
    start_time: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Подготавливаем данные (преобразуем число)
      const payload = {
        ...formData,
        max_players: parseInt(formData.max_players)
      };

      await tournamentApi.createTournament(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(apiUtils.handleError(err));
    } finally {
      setLoading(false);
    }
  };

  // Стили для инпутов (вынесены для чистоты)
  const inputStyle = {
    width: '100%',
    padding: '12px',
    background: '#1a1a1a',
    border: '1px solid #333',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '20px',
    outline: 'none'
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          СОЗДАНИЕ ТУРНИРА
        </h1>
        
        <form 
          onSubmit={handleSubmit}
          style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px' }}
        >
          {error && <p style={{ color: 'var(--pink)', marginBottom: '15px' }}>{error}</p>}

          <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Название</label>
          <input 
            name="name"
            type="text" 
            placeholder="Напр: Epic Deathmatch #1" 
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Игра</label>
              <input 
                name="game"
                type="text" 
                placeholder="Например: DOTA 2" 
                value={formData.game}
                onChange={handleChange}
                required
                style={inputStyle} 
              />
            </div>
            <div>
              <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Макс. игроков</label>
              <input 
                name="max_players"
                type="number" 
                value={formData.max_players}
                onChange={handleChange}
                style={inputStyle} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Дата и время начала</label>
              <input 
                name="start_time"
                type="datetime-local" 
                value={formData.start_time}
                onChange={handleChange}
                required
                style={inputStyle} 
              />
            </div>
            <div>
              <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Формат</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                style={inputStyle}
              >
                <option value="1v1">1v1</option>
                <option value="3v3">3v3</option>
                <option value="5v5">5v5</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="button-profile" 
            disabled={loading}
            style={{ 
              width: '100%', 
              height: '50px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'СОЗДАНИЕ...' : 'ОПУБЛИКОВАТЬ'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}