const TaskItem = ({ task, onToggle, onDelete }) => {
  // Color coding based on priority
  const priorityColor = {
    high: 'red',
    medium: 'orange',
    low: 'green'
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span style={{ color: priorityColor[task.priority], fontWeight: 'bold' }}>
          {task.priority.toUpperCase()}
        </span>
        {task.dueDate && <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>}
      </div>
      
      <div className="task-actions">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggle(task._id, !task.completed)} 
        />
        <button onClick={() => onDelete(task._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;