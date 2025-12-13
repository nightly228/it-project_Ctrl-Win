// src/App/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// ИЗМЕНИТЬ ПУТЬ: вместо './pages/Dashboard' используйте '../pages/Dashboard'
import Dashboard from '../pages/Dashboard'; 
import Profile from '../pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;