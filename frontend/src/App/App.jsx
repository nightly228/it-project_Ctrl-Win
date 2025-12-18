// src/App/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Импорт страниц
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Стили
import '../styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* При заходе на базовую ссылку перенаправляем на логин */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Маршруты БЕЗ сайтбара (для входа и регистрации) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Маршруты С сайтбаром (через наш DashboardLayout) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Если ввели несуществующий путь — на логин */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;