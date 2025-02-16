import React from 'react';
import './FriendsList.css';
import FriendItem from './FriendItem';

const FriendsList = () => {
  const friends = [
    { name: 'Ann Lubin', xp: '3247', avatar: '/avatars/ann.jpg', isOnline: false },
    { name: 'Corey Carder', xp: '1530', avatar: '/avatars/corey.jpg', isOnline: false },
    { name: 'Nolan Ekstrom', xp: '2411', avatar: '/avatars/nolan.jpg', isOnline: true },
    { name: 'Zaire Bergson', xp: '1748', avatar: '/avatars/zaire.jpg', isOnline: false }
  ];

  return (
    <div className="friends-list">
      <div className="friends-header">
        <div className="header-left">
          <h2>Friends</h2>
          <span className="subtitle">(All-Time XP)</span>
        </div>
        <button className="view-all">View all</button>
      </div>
      <div className="friends-items">
        {friends.map((friend, index) => (
          <FriendItem key={index} {...friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList; 