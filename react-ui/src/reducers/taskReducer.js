import taskService from '../services/tasks'

const initialState = []

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TASKS':
      return action.tasks
    case 'CREATE_TASK':
      return [...state, action.task]
    case 'UPDATE_TASK': {
      const filteredTasks = state.filter(task => task.id !== action.task.id)
      return [...filteredTasks, action.task]
    }
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}

export const initTasks = () => {
  return async (dispatch) => {
    const tasks = await taskService.getAll()
    dispatch({
      type: 'INIT_TASKS',
      tasks
    })
  }
}

export const createTask = (newTask) => {
  return async (dispatch) => {
    const task = await taskService.createNew(newTask)
    dispatch({
      type: 'CREATE_TASK',
      task
    })
  }
}

export const changeStatus = (task, status) => {
  return async (dispatch) => {
    const updatedTask = await taskService.update({
      id: task.id,
      name: task.name,
      description: task.description,
      status
    })
    dispatch({
      type: 'UPDATE_TASK',
      task: { ...updatedTask, info: true }
    })
  }
}

export const toggleInfo = (task) => {
  const updatedTask = { ...task, info: !task.info }
  return({
    type: 'UPDATE_TASK',
    task: updatedTask
  })
}

export const removeTask = (task) => {
  return async (dispatch) => {
    await taskService.remove(task)
    dispatch({
      type: 'DELETE_TASK',
      task
    })
  }
}

export default taskReducer