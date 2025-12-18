import React from "react";
import { useNavigate } from 'react-router-dom'; // Импорт навигации
import DashboardLayout from "../layout/DashboardLayout";
import CommandCenter from "../components/dashboard/CommandCenter";
import StatsGrid from "../components/dashboard/StatsGrid";
import StreamsBlock from "../components/dashboard/StreamsBlock";
import Notifications from "../components/dashboard/Notifications";
import TournamentsHistory from "../components/dashboard/TournamentsHistory";
import CalendarBlock from "../components/dashboard/CalendarBlock";           // НОВЫЙ
import OrganizerAchievements from "../components/dashboard/OrganizerAchievements"; // НОВЫЙ

import {
  dashboardData,
  tournamentsHistory
} from "../global/mockData";

export default function Dashboard() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем турниры при монтировании компонента
  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const data = await tournamentApi.getAllTournaments();
      console.log(data);
      setTournaments(data);
    } catch (err) {
      setError(apiUtils.handleError(err));
      console.error("Ошибка при загрузке турниров:", err);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate(); // Инициализация хука навигации

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 32 }}>
        <CommandCenter />
      </div>

      <StatsGrid data={dashboardData.stats} />

      <div className="grid-2">
        <StreamsBlock data={dashboardData.streams} />
        <Notifications data={dashboardData.notifications} />
      </div>

      <div style={{ marginTop: 24 }}>
        {/* Передаем функцию навигации в компонент истории турниров */}
        <TournamentsHistory 
          data={tournamentsHistory} 
          onTournamentClick={(id) => navigate(`/tournament/${id}`)}
        />
      </div>
      
      <div className="grid-2">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Загрузка календаря турниров...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p style={{ color: "red" }}>Ошибка: {error}</p>
            <button onClick={fetchTournaments}>Повторить</button>
          </div>
        ) : (
          <CalendarBlock data={tournaments} />
        )}
        <OrganizerAchievements data={dashboardData.organizerAchievements} />
      </div>

    </DashboardLayout>
  );
}