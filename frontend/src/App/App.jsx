import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Импорт страниц - ПРОВЕРЬ, ЧТОБЫ ИМЕНА ФАЙЛОВ СОВПАДАЛИ (обычно с большой буквы)
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateTournament from '../pages/CreateTournament';
import Settings from '../pages/Settings';
import TournamentView from '../pages/TournamentView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tournament/:id" element={<TournamentView />} />

        {/* Редиректы */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}