// src/layout/DashboardLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../components/ui/Sidebar"; 
import Topbar from "../components/ui/Topbar";  

export default function DashboardLayout({ children }) {
  const location = useLocation();
  // Проверяем, находимся ли мы на странице профиля
  const isProfilePage = location.pathname.includes('/profile');

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        {/* Передаем флаг в Topbar */}
        <Topbar isProfilePage={isProfilePage} />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}