import React from 'react';
import './FriendItem.css';

const FriendItem = ({ name, xp, avatar, isOnline }) => (
  <div className="friend-item">
    <div className="friend-info">
      <div className="avatar-container">
        <img src={avatar} alt={name} className="avatar" />
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
      </div>
      <span className="friend-name">{name}</span>
    </div>
    <span className="friend-xp">{xp} XP</span>
  </div>
);

export default FriendItem; 