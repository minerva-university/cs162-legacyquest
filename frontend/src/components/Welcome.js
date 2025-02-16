import React from 'react';
import './Welcome.css';
import WelcomeIcon from './WelcomeIcon';

const Welcome = ({ name = 'Minie', progress = 50 }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <WelcomeIcon />
        <div className="welcome-text">
          <h1>Welcome back {name}!</h1>
          <p>You have completed {progress}% of your daily goal!</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 