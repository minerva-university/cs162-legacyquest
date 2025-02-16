import React from 'react';
import './MainMenu.css';

const MainMenu = () => {
  return (
    <nav className="main-menu">
      <div className="menu-item active">
        <span>Dashboard</span>
        <div className="underline active"></div>
      </div>
      <div className="menu-item">
        <span>My Courses</span>
        <div className="underline"></div>
      </div>
      <div className="menu-item">
        <span>Discover more courses</span>
        <div className="underline"></div>
      </div>
    </nav>
  );
};

export default MainMenu; 