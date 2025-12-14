import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api'; // Import createTask
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm'; // Import the new component
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // NEW: Handle Adding a Task
  const handleAddTask = async (newTaskData) => {
    try {
      const { data } = await createTask(newTaskData);
      setTasks([data, ...tasks]); // Add new task to the top of the list
      setIsFormVisible(false); // Close form
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // ... (handleToggle and handleDelete remain the same as before) ...
  const handleToggle = async (id, status) => {
    try {
      const { data } = await updateTask(id, { completed: status });
      setTasks(tasks.map(task => task._id === id ? data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        {/* Toggle button changes based on visibility */}
        <button 
          className="add-btn" 
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Close' : '+ Add Task'}
        </button>
      </header>
      
      <main>
        {/* Conditionally render the form */}
        {isFormVisible && (
          <AddTaskForm 
            onAdd={handleAddTask} 
            onCancel={() => setIsFormVisible(false)} 
          />
        )}

        <TaskList 
          tasks={tasks} 
          onToggle={handleToggle} 
          onDelete={handleDelete} 
        />
      </main>
    </div>
  );
}

export default App;