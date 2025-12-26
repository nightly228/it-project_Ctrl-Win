import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { tournamentApi, apiUtils } from '../global/api';

export default function TournamentDetail() {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTournament();
    }, [id]);

    const loadTournament = async () => {
        try {
            setLoading(true);
            const data = await tournamentApi.getTournamentById(id);
            setTournament(data);
        } catch (err) {
            setError(apiUtils.handleError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        try {
            setJoining(true);
            await tournamentApi.joinTournament(id);
            alert("Вы успешно зарегистрированы!");
            loadTournament(); // Обновляем данные (счетчик участников)
        } catch (err) {
            alert(apiUtils.handleError(err));
        } finally {
            setJoining(false);
        }
    };

    if (loading) return <DashboardLayout><div className="loader">Загрузка...</div></DashboardLayout>;
    if (error) return <DashboardLayout><div className="error">{error}</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <style>{`
                .t-container { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-top: 20px; }
                .t-card { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); }
                .t-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .t-title { font-size: 32px; font-weight: 800; color: white; margin: 0; }
                .t-badge { padding: 4px 12px; border-radius: 4px; font-size: 12px; text-transform: uppercase; font-weight: bold; }
                .t-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
                .t-info-item { background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; }
                .t-info-label { color: #9ca3af; font-size: 12px; margin-bottom: 5px; }
                .t-info-value { color: white; font-size: 18px; font-weight: bold; }
                .btn-join { 
                    width: 100%; padding: 15px; background: var(--purple); color: white; 
                    border: none; border-radius: 10px; font-weight: bold; cursor: pointer; 
                    font-size: 16px; margin-top: 20px; transition: 0.3s;
                }
                .btn-join:disabled { opacity: 0.5; cursor: not-allowed; }
            `}</style>

            <div className="t-header">
                <div>
                    <h1 className="t-title">{tournament.name}</h1>
                    <div style={{ color: 'var(--cyan)', marginTop: 5 }}>🎮 {tournament.game} • {tournament.match_type}</div>
                </div>
                <span className={`t-badge status-${tournament.status}`}>{tournament.status}</span>
            </div>

            <div className="t-container">
                <div className="t-card">
                    <h3>Информация о турнире</h3>
                    <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                        Добро пожаловать на {tournament.name}. Турнир пройдет в формате {tournament.bracket_type}. 
                        Убедитесь, что вы ознакомились с правилами перед регистрацией.
                    </p>
                    
                    <div className="t-grid">
                        <div className="t-info-item">
                            <div className="t-info-label">Призовой фонд</div>
                            <div className="t-info-value" style={{ color: 'var(--yellow)' }}>${tournament.prize_pool}</div>
                        </div>
                        <div className="t-info-item">
                            <div className="t-info-label">Взнос</div>
                            <div className="t-info-value">{tournament.entry_fee > 0 ? `$${tournament.entry_fee}` : 'Бесплатно'}</div>
                        </div>
                        <div className="t-info-item">
                            <div className="t-info-label">Начало</div>
                            <div className="t-info-value">{new Date(tournament.start_time).toLocaleString()}</div>
                        </div>
                        <div className="t-info-item">
                            <div className="t-info-label">Сетка</div>
                            <div className="t-info-value" style={{ fontSize: 14 }}>{tournament.bracket_type}</div>
                        </div>
                    </div>
                </div>

                <div className="t-card" style={{ height: 'fit-content' }}>
                    <h3 style={{ marginTop: 0 }}>Регистрация</h3>
                    <div style={{ fontSize: 14, color: '#9ca3af' }}>Участники:</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', margin: '10px 0' }}>
                        {tournament.current_players || 0} / {tournament.max_players}
                    </div>
                    
                    <button 
                        className="btn-join" 
                        onClick={handleJoin} 
                        disabled={joining || tournament.status !== 'registration'}
                    >
                        {joining ? 'ОБРАБОТКА...' : 'УЧАСТВОВАТЬ'}
                    </button>
                    
                    <div style={{ fontSize: 11, color: '#666', marginTop: 15, textAlign: 'center' }}>
                        Нажимая кнопку, вы соглашаетесь с правилами платформы.
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}