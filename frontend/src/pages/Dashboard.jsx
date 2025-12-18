import React from "react";
import { useNavigate } from 'react-router-dom'; // Импорт навигации
import DashboardLayout from "../layout/DashboardLayout";
import CommandCenter from "../components/dashboard/CommandCenter";
import StatsGrid from "../components/dashboard/StatsGrid";
import StreamsBlock from "../components/dashboard/StreamsBlock";
import Notifications from "../components/dashboard/Notifications";
import TournamentsHistory from "../components/dashboard/TournamentsHistory";
import CalendarBlock from "../components/dashboard/CalendarBlock";           
import OrganizerAchievements from "../components/dashboard/OrganizerAchievements";

import {
  dashboardData,
  tournamentsHistory
} from "../global/mockData";

export default function Dashboard() {
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
        <CalendarBlock data={dashboardData.calendar} />
        <OrganizerAchievements data={dashboardData.organizerAchievements} />
      </div>

    </DashboardLayout>
  );
}