import React from 'react';
import './Leaderboard.css';

const LeaderboardItem = ({ rank, name, points, avatar, isActive }) => (
  <div className={`leaderboard-item ${isActive ? 'active' : ''}`}>
    <span className="rank">{rank}</span>
    <div className="user-info">
      <img src={avatar} alt={name} className="avatar" />
      <span className="name">{name}</span>
    </div>
    <span className="points">{points} Points</span>
  </div>
);

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'Octagon', points: 2500, avatar: '/avatars/user1.jpg', isActive: true },
    { rank: 2, name: 'Ocean', points: 2450, avatar: '/avatars/user2.jpg' },
    { rank: 3, name: 'Laurel', points: 2200, avatar: '/avatars/user3.jpg' },
    { rank: 10, name: 'Davis', points: 1100, avatar: '/avatars/user4.jpg' },
    { rank: 12, name: 'Davis', points: 1100, avatar: '/avatars/user5.jpg' }
  ];

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Legacy Ranking</h2>
        <button className="view-all">View all</button>
      </div>
      <div className="leaderboard-list">
        {leaderboardData.map((user) => (
          <LeaderboardItem key={user.rank} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 