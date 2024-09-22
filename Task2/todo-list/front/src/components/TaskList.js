import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/tasks'); // Correct API endpoint
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (taskName === '' || taskDescription === '') {
      setModalMessage('Task name and description cannot be empty!');
      setShowModal(true);
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      completed: false,
    };
  
    try {
      let response;
  
      if (editingTaskId) {
        // Update the existing task
        response = await fetch(`/tasks/${editingTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
        const updatedTask = await response.json();
        setTasks(tasks.map(task => (task._id === editingTaskId ? updatedTask : task))); // Use MongoDB's _id
        setModalMessage('Task updated successfully!');
      } else {
        // Add new task
        response = await fetch('/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
        const addedTask = await response.json();
        setTasks([...tasks, addedTask]); 
        setModalMessage('Task added successfully!');
      }
  
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error adding task!');
    }
  
    setTaskName('');
    setTaskDescription('');
    setEditingTaskId(null); // Clear editing state
    setShowModal(true);
  };
  
  const deleteTask = async (id) => {
    try {
      await fetch(`/tasks/${id}`, {
        method: 'DELETE',
      });
      const updatedTasks = tasks.filter(task => task._id !== id); // Use MongoDB's _id
      setTasks(updatedTasks);
      setModalMessage('Task deleted successfully!');
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting task:', error);
      setModalMessage('Error deleting task!');
      setShowModal(true);
    }
  };
  
  const startEditing = (task) => {
    setTaskName(task.name);
    setTaskDescription(task.description);
    setEditingTaskId(task._id); // Use MongoDB's _id
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="task-list">
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}

      <form onSubmit={addTask}>
        <div className="form-container">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
          <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
        </div>
      </form>

      {tasks.map((task) => (
        <div className={`task-item ${task.completed ? 'completed' : ''}`} key={task._id}>
          <div>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
          <div>
            <button onClick={() => startEditing(task)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button> {/* Use MongoDB's _id */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
