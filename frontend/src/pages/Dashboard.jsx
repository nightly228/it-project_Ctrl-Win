// src/pages/Dashboard.jsx

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
        <TournamentsHistory data={tournamentsHistory} />
      </div>
      
      <div className="grid-2">
        <CalendarBlock data={dashboardData.calendar} />
        <OrganizerAchievements data={dashboardData.organizerAchievements} />
      </div>

    </DashboardLayout>
  );
}