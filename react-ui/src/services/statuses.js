import axios from 'axios';
const baseUrl = '/api/statuses';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };