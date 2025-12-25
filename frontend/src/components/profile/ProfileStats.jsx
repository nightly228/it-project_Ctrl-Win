// src/components/profile/ProfileStats.jsx

export default function ProfileStats({ data }) {
    // Расчет процента побед (условно, если avg_place близок к 1)
    const winRate = data.avg_place ? Math.max(0, 100 - (data.avg_place * 10)).toFixed(0) : 0;

    return (
        <div className="profile-stats-container">
            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-top: 30px;
                }
                .stat-card {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 16px;
                    padding: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    min-height: 320px;
                }
                .stat-card.yellow { border-left: 4px solid var(--yellow); }
                .stat-card.pink { border-left: 4px solid var(--pink); }

                .chart-mini-bar {
                    display: flex;
                    align-items: flex-end;
                    gap: 8px;
                    height: 100px;
                    margin: 20px 0;
                }
                .bar {
                    flex: 1;
                    background: var(--yellow);
                    border-radius: 4px 4px 0 0;
                    opacity: 0.6;
                    transition: height 0.3s ease;
                }
                .bar:hover { opacity: 1; transform: scaleX(1.1); }

                .circular-stat {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                }
                .circle-progress {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: conic-gradient(var(--pink) ${winRate}%, #2d2d3d 0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .circle-progress::after {
                    content: '${winRate}%';
                    position: absolute;
                    width: 65px;
                    height: 65px;
                    background: #1a1a2e;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                .legend {
                    font-size: 13px;
                    color: #9ca3af;
                    line-height: 1.8;
                }
                .legend b { color: white; }
            `}</style>

            <div className="stats-grid">
                {/* Турнирная статистика */}
                <div className="stat-card yellow">
                    <h3 style={{ margin: 0, fontSize: 18 }}>🏆 Турнирная активность</h3>
                    
                    <div className="chart-mini-bar">
                        {/* Визуализация активности (фейковые данные для вида графика) */}
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '70%' }}></div>
                        <div className="bar" style={{ height: '55%' }}></div>
                        <div className="bar" style={{ height: '90%' }}></div>
                        <div className="bar" style={{ height: '45%' }}></div>
                        <div className="bar" style={{ height: '100%' }}></div>
                    </div>

                    <div className="legend">
                        <div>Участий: <b>{data.total_participated}</b></div>
                        <div>Организовано: <b>{data.total_organized}</b></div>
                        <div>Среднее место: <b>{data.avg_place || '—'}</b></div>
                    </div>
                </div>

                {/* Финансовая статистика */}
                <div className="stat-card pink">
                    <h3 style={{ margin: 0, fontSize: 18 }}>💰 Эффективность (ROI)</h3>
                    
                    <div className="circular-stat">
                        <div className="circle-progress"></div>
                        <div className="legend" style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 24, color: 'var(--pink)', fontWeight: 800 }}>
                                ${data.revenue.toLocaleString()}
                            </div>
                            <div>Общая прибыль</div>
                            <div style={{ marginTop: 10 }}>
                                Спонсоры: <b>${(data.revenue * 0.7).toFixed(0)}</b>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span>Прогресс до цели $10k</span>
                            <span>{((data.revenue / 10000) * 100).toFixed(1)}%</span>
                        </div>
                        <div style={{ 
                            width: '100%', 
                            height: 6, 
                            background: '#2d2d3d', 
                            borderRadius: 3, 
                            marginTop: 8,
                            overflow: 'hidden'
                        }}>
                            <div style={{ 
                                width: `${Math.min(100, (data.revenue / 10000) * 100)}%`, 
                                height: '100%', 
                                background: 'var(--pink)' 
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}