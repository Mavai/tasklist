import taskService from '../services/tasks'

const initialState = []

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TASKS':
      return action.tasks
    case 'CREATE_TASK':
      return [...state, action.task]
    case 'CHANGE_TASK_STATUS': {
      const filteredTasks = state.filter(task => task.id !== action.task.id)
      return [...filteredTasks, action.task]
    }
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
    const updatedTask = await taskService.update({ ...task, status })
    dispatch({
      type: 'CHANGE_TASK_STATUS',
      task: updatedTask
    })
  }
}

export default taskReducer