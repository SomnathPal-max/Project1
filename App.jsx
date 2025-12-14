import FilterBar from './components/FilterBar'; // Import the new component

// ... inside App function ...
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // State for filter
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Re-fetch tasks whenever the 'filter' state changes
  useEffect(() => {
    fetchTasks();
  }, [filter]); 

  const fetchTasks = async () => {
    try {
      // If filter is 'all', don't send a query param. Otherwise send ?status=...
      const query = filter === 'all' ? '' : `?status=${filter}`;
      const { data } = await api.get(`/tasks${query}`); // Using the api instance directly here
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // ... handleAddTask, handleToggle, handleDelete remain the same ...

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button 
          className="add-btn" 
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Close' : '+ Add Task'}
        </button>
      </header>
      
      <main>
        {isFormVisible && (
          <AddTaskForm 
            onAdd={handleAddTask} 
            onCancel={() => setIsFormVisible(false)} 
          />
        )}

        {/* Add FilterBar above the list */}
        <div className="controls">
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <TaskList 
          tasks={tasks} 
          onToggle={handleToggle} 
          onDelete={handleDelete} 
        />
      </main>
    </div>
  );