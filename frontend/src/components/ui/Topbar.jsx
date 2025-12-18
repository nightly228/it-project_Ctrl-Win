// src/components/ui/Topbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar({ isProfilePage }) {
  const buttonText = isProfilePage ? 'DASHBOARD' : 'PROFILE';
  const targetPath = isProfilePage ? '/dashboard' : '/profile';

  return (
    <div className="topbar">
      <div className="logo-text">CTRL+WIN</div>

      <div className="topbar-right">
        <Link to={targetPath} className="button-profile" style={{ textDecoration: 'none' }}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}