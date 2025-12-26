import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../layout/DashboardLayout";
import CommandCenter from "../components/dashboard/CommandCenter";
import StatsGrid from "../components/dashboard/StatsGrid";
import StreamsBlock from "../components/dashboard/StreamsBlock";
import Notifications from "../components/dashboard/Notifications";
import TournamentsHistory from "../components/dashboard/TournamentsHistory";
import CalendarBlock from "../components/dashboard/CalendarBlock";
import OrganizerAchievements from "../components/dashboard/OrganizerAchievements";

import { dashboardData } from "../global/mockData";
import { userApi, tournamentApi, apiUtils } from "../global/api";

export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  const [platformStats, setPlatformStats] = useState(null); // Новое состояние
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Загружаем ТРИ источника данных параллельно
      const [tData, uData, sData] = await Promise.all([
        tournamentApi.getAllTournaments(),
        userApi.getUserInfo(),
        tournamentApi.getPlatformStats() // Тот самый запрос на кол-во турниров и участников
      ]);
      
      console.log(tData);
      console.log(uData);
      console.log(sData);

      setTournaments(tData.tournaments || tData);
      setUserData(uData);
      setPlatformStats(sData);
    } catch (err) {
      setError(apiUtils.handleError(err));
    } finally {
      setLoading(false);
    }
  };

  // Формируем сетку статистики
  const mappedStats = [
    // Глобальная статистика (то, что ты просил)
    { 
      label: "Всего турниров на Ctrl+Win", 
      value: platformStats?.all_time?.tournaments || 0, 
      subValue: `+${platformStats?.last_month?.tournaments} в этом месяце`,
      icon: "🏆", 
      color: "var(--purple)" 
    },
    { 
      label: "Участников за всё время на Ctrl+Win", 
      value: platformStats?.all_time?.participants || 0, 
      subValue: `+${platformStats?.last_month?.participants} новых`,
      icon: "👥", 
      color: "var(--cyan)" 
    },
    // Твоя личная статистика
    { label: "Мой доход", value: `${userData?.revenue || 0} ₽`, icon: "💰", color: "#10b981" },
    { label: "Ср. место", value: userData?.avg_place || "—", icon: "⭐", color: "var(--yellow)" }
  ];

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 32 }}>
        <CommandCenter name={userData?.name} role={userData?.role} />
      </div>

      {/* Передаем обновленную комбинированную статистику */}
      <StatsGrid data={mappedStats} />

      <div className="grid-2">
        <StreamsBlock data={dashboardData.streams} />
        <Notifications data={dashboardData.notifications} />
      </div>

      <div style={{ marginTop: 24 }}>
        <TournamentsHistory 
          data={tournaments} 
          onTournamentClick={(id) => navigate(`/tournament/${id}`)}
        />
      </div>
      
      <div className="grid-2">
        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading-spinner"></div>
            <p style={{ color: '#9ca3af', marginTop: 10 }}>Загрузка аналитики...</p>
          </div>
        ) : error ? (
          <div className="error-container" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: "var(--pink)" }}>Ошибка: {error}</p>
            <button className="button-profile" onClick={fetchAll}>Повторить</button>
          </div>
        ) : (
          <>
            <CalendarBlock data={tournaments} />
            <OrganizerAchievements 
               organizedCount={userData?.total_organized || 0} 
               data={dashboardData.organizerAchievements} 
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}