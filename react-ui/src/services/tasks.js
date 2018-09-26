import axios from 'axios';
const baseUrl = 'api/tasks';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getAllFromProject = async (id) => {
  const response = await axios.get(`${baseUrl}/project/${id}`);
  return response.data;
};

const createNew = async (task) => {
  const response = await axios.post(baseUrl, task);
  return response.data;
};

const update = async (task) => {
  const response = await axios.put(`${baseUrl}/${task.id}`, task);
  return response.data;
};

const remove = async (task) => {
  const response = await axios.delete(`${baseUrl}/${task.id}`);
  return response.data;
};

export default { getAll, getAllFromProject, createNew, update, remove };