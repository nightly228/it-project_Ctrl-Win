// src/layout/DashboardLayout.jsx

import Sidebar from "../components/ui/Sidebar"; // ИЗМЕНЕНО
import Topbar from "../components/ui/Topbar";   // ИЗМЕНЕНО

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}