import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: '/api', // This works because of the proxy in vite.config.js
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task) => api.post('/tasks', task);
export const updateTask = (id, updates) => api.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;