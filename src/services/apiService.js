import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchAllHttpCodes = async () => {
  const response = await axios.get('/api/http-codes');
  return response.data;
};

export const filterHttpCodes = async (filter) => {
  const response = await axios.get(`/api/http-codes/filter?filter=${filter}`);
  return response.data;
};

export const fetchUserLists = async () => {
  const response = await axios.get('/api/lists');
  return response.data;
};

export const fetchListById = async (id) => {
  const response = await axios.get(`/api/lists/${id}`);
  return response.data;
};

export const createList = async (listData) => {
  const response = await axios.post('/api/lists', listData);
  return response.data;
};

export const updateList = async (id, listData) => {
  const response = await axios.put(`/api/lists/${id}`, listData);
  return response.data;
};

export const deleteList = async (id) => {
  const response = await axios.delete(`/api/lists/${id}`);
  return response.data;
};