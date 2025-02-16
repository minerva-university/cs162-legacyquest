import React from 'react';
import './GamifiedProgress.css';

const GamifiedProgress = () => {
  const progress = 82; // This could be passed as a prop

  return (
    <div className="gamified-progress">
      <div className="progress-circle-container">
        <div className="progress-circle">
          <div className="circle-background"></div>
          <div 
            className="circle-progress" 
            style={{ 
              background: `conic-gradient(#D98F41 ${progress}%, transparent ${progress}%)`
            }}
          ></div>
          <div className="progress-percentage">{progress}</div>
        </div>
      </div>
      <p className="progress-message">
        You have completed <span className="highlight">{progress}% of</span>
        <br />
        <span className="highlight">your task list.</span> Keep it up!
      </p>
    </div>
  );
};

export default GamifiedProgress; 