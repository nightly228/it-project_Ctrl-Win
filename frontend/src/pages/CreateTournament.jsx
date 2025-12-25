import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { tournamentApi, apiUtils } from '../global/api';

export default function CreateTournament() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    match_type: '1v1', // Обновили имя поля
    bracket_type: 'single_elimination', // Новое поле
    max_players: 16,
    start_time: '',
    prize_pool: 0,      // Финансы
    entry_fee: 0,       // Финансы
    sponsor_revenue: 0  // Финансы
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
      // Подготовка данных: приводим всё к нужным типам
      const payload = {
        ...formData,
        max_players: parseInt(formData.max_players),
        prize_pool: parseFloat(formData.prize_pool),
        entry_fee: parseFloat(formData.entry_fee),
        sponsor_revenue: parseFloat(formData.sponsor_revenue)
      };

      await tournamentApi.createTournament(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(apiUtils.handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    background: '#1a1a1a',
    border: '1px solid #333',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '20px',
    outline: 'none',
    fontSize: '14px'
  };

  const labelStyle = { color: '#aaa', display: 'block', marginBottom: '8px', fontSize: '13px' };

  return (
    <DashboardLayout>
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', marginBottom: '20px', textAlign: 'center', letterSpacing: '2px' }}>
          НОВЫЙ ТУРНИР
        </h1>
        
        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px' }}>
          {error && <p style={{ color: 'var(--pink)', marginBottom: '15px' }}>{error}</p>}

          <label style={labelStyle}>Название турнира</label>
          <input name="name" type="text" placeholder="Напр: Pro League Winter 2025" value={formData.name} onChange={handleChange} required style={inputStyle} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Дисциплина (Игра)</label>
              <input name="game" type="text" placeholder="CS2, Dota 2..." value={formData.game} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Дата и время начала</label>
              <input name="start_time" type="datetime-local" value={formData.start_time} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Макс. участников</label>
              <input name="max_players" type="number" value={formData.max_players} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Формат</label>
              <select name="match_type" value={formData.match_type} onChange={handleChange} style={inputStyle}>
                <option value="1v1">Solo (1v1)</option>
                <option value="3v3">Trio (3v3)</option>
                <option value="5v5">Team (5v5)</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Тип сетки</label>
              <select name="bracket_type" value={formData.bracket_type} onChange={handleChange} style={inputStyle}>
                <option value="single_elimination">Single Elimination</option>
                <option value="double_elimination">Double Elimination</option>
                <option value="round_robin">Круговая</option>
              </select>
            </div>
          </div>

          <h3 style={{ color: 'var(--cyan)', fontSize: '14px', marginBottom: '15px', marginTop: '10px', textTransform: 'uppercase' }}>
             Экономика турнира
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Призовой фонд ($)</label>
              <input name="prize_pool" type="number" step="0.01" value={formData.prize_pool} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Взнос ($)</label>
              <input name="entry_fee" type="number" step="0.01" value={formData.entry_fee} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Спонсоры ($)</label>
              <input name="sponsor_revenue" type="number" step="0.01" value={formData.sponsor_revenue} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <button type="submit" className="button-profile" disabled={loading}
            style={{ 
              width: '100%', height: '55px', cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '20px', background: 'var(--purple)', border: 'none', color: 'white',
              fontWeight: 'bold', borderRadius: '8px', fontSize: '16px'
            }}
          >
            {loading ? 'СОЗДАНИЕ...' : 'ОПУБЛИКОВАТЬ ТУРНИР'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}