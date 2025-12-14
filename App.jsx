import { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from './api';
import TaskList from './components/TaskList';
import './App.css'; // We will add styles next

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on initial load
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

  // Handle toggling complete/incomplete
  const handleToggle = async (id, status) => {
    try {
      const { data } = await updateTask(id, { completed: status });
      // Update UI immediately by mapping through state
      setTasks(tasks.map(task => task._id === id ? data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    
    try {
      await deleteTask(id);
      // Remove from UI
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        {/* We will add the "Add Task" button here in the next step */}
      </header>
      
      <main>
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