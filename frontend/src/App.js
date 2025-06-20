import React from 'react';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 text-success">Team Collaboration Board</h2>
      <TaskBoard />
    </div>
  );
}

export default App; 
