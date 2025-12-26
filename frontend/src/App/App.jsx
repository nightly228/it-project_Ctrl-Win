import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Импорт страниц - ПРОВЕРЬ, ЧТОБЫ ИМЕНА ФАЙЛОВ СОВПАДАЛИ (обычно с большой буквы)
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CreateTournament from '../pages/CreateTournament';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import TournamentDetail from '../pages/TournamentDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Базовые страницы */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Дашборд и его подразделы */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tournament/:id" element={<TournamentDetail />} />

        {/* Редирект: если зашли на "/" — идем на логин */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Если ввели несуществующий адрес — на дашборд */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}