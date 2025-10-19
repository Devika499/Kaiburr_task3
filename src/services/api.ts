import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskApi = {
  // Get all tasks or task by ID
  getAllTasks: async (id?: string): Promise<Task[]> => {
    const params = id ? { id } : {};
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Create or update a task
  createOrUpdateTask: async (task: CreateTaskRequest | UpdateTaskRequest): Promise<Task> => {
    const response = await api.put('/tasks', task);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<string> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Find tasks by name
  findTasksByName: async (name: string): Promise<Task[]> => {
    const response = await api.get('/tasks/find', { params: { name } });
    return response.data;
  },

  // Execute a task
  executeTask: async (id: string): Promise<Task> => {
    const response = await api.put(`/tasks/${id}/execute`);
    return response.data;
  },
};

export default api;
