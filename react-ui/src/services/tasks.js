import axios from 'axios'
const baseUrl = 'http://localhost:3001/tasks'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (task) => {
  const response = await axios.post(baseUrl, task)
  return response.data
}

const update = async (task) => {
  const response = await axios.put(`${baseUrl}/${task.id}`, task)
  return response.data
}

export default { getAll, createNew, update }