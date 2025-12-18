// src/components/ui/Topbar.jsx

import { Link } from 'react-router-dom';

export default function Topbar() {
  const isDashboard = window.location.pathname === '/dashboard';
  const isProfile = window.location.pathname === '/profile';

  return (
    <div className="topbar">
      {isDashboard && <div className="logo-text">Tournament Dashboard</div>}
      {isProfile && <div className="logo-text">Profile Page</div>}
      
      <div className="profile-button-group">
        <div className="topbar-status" style={{color: '#9ca3af', fontSize: 14, marginRight: 10}}>
            CTRL<span className='text-cyan'>+</span>WIN
        </div>
        <Link to="/profile">
            <button className="button-profile">ПРОФИЛЬ</button>
        </Link>
        <div className="profile-avatar-small"></div>
      </div>
    </div>
  );
}