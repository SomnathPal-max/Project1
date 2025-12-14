import { useState } from 'react';

const AddTaskForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium', // Default value
    dueDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Title is required');
    
    // Pass data to parent
    onAdd(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  return (
    <div className="form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g., Finish Project 1" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Details about the task..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Save Task</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;