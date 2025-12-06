import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Developer endpoints
export const getDevelopers = async (params = {}) => {
  const response = await api.get('/developers', { params });
  return response.data;
};

export const getDeveloper = async (id) => {
  const response = await api.get(`/developers/${id}`);
  return response.data;
};

export const addDeveloper = async (developerData) => {
  const response = await api.post('/developers', developerData);
  return response.data;
};

export const updateDeveloper = async (id, developerData) => {
  const response = await api.put(`/developers/${id}`, developerData);
  return response.data;
};

export const deleteDeveloper = async (id) => {
  const response = await api.delete(`/developers/${id}`);
  return response.data;
};
