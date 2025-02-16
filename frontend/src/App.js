import React from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import Welcome from './components/Welcome';
import TaskList from './components/TaskList';
import GamifiedProgress from './components/GamifiedProgress';
import Leaderboard from './components/Leaderboard';
import ProfileArea from './components/profile/ProfileArea';

function App() {
  return (
    <div className="App">
      <MainMenu />
      <div className="main-content">
        <Welcome />
        <div className="dashboard">
          <TaskList />
          <GamifiedProgress />
          <Leaderboard />
          <ProfileArea />
        </div>
      </div>
    </div>
  );
}

export default App;
