import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://developer-directory-api.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDevelopers = async () => {
  const response = await api.get('/developers');
  return response.data;
};

export const addDeveloper = async (developerData) => {
  const response = await api.post('/developers', developerData);
  return response.data;
};

export const deleteDeveloper = async (id) => {
  const response = await api.delete(`/developers/${id}`);
  return response.data;
};
