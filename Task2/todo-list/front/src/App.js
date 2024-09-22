import './App.css';
import React from 'react';
import TaskList from './components/TaskList';
import DateTime from './components/DateTime';
function App() {
  return (
    <div className="App">
   <header className="App-header">
        <h1>📝 To-Do List App</h1>
        <DateTime/> {/* Display current date and time */}
      </header>
      
      <TaskList /> {/* Your task list component */}
    </div>
  );
}

export default App;
