import React from 'react';
import './TaskList.css';

const TaskList = () => {
  return (
    <div className="task-list">
      <div className="task-list-container">
        <div className="task-list-header">
          <h2>Task List</h2>
          <button className="go-to-course">Go to course</button>
        </div>
        
        <div className="progress-section">
          <div className="progress-item">
            <div className="progress-icon checkpoint">
              <span className="progress-number">3</span>
            </div>
            <div className="progress-details">
              <span>Checkpoints Progress</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '43%'}}></div>
              </div>
              <span className="progress-ratio">3/7</span>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-icon level">
              <span className="progress-number">2</span>
            </div>
            <div className="progress-details">
              <span>Level Progress</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '40%'}}></div>
              </div>
              <span className="progress-ratio">2/5</span>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-icon lesson">
              <span className="progress-number">8</span>
            </div>
            <div className="progress-details">
              <span>Lesson Progress</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '89%'}}></div>
              </div>
              <span className="progress-ratio">8/9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
