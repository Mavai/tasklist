import taskService from '../services/tasks';
import projectService from '../services/projects';

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TASKS':
      return action.tasks;
    case 'CREATE_TASK':
      return [...state, action.task];
    case 'UPDATE_TASK': {
      const filteredTasks = state.filter(task => task.id !== action.task.id);
      return [...filteredTasks, action.task];
    }
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.task.id);
    default:
      return state;
  }
};

export const initTasks = (id) => {
  return async (dispatch) => {
    const tasks = await taskService.getAllFromProject(id);
    dispatch({
      type: 'INIT_TASKS',
      tasks
    });
  };
};

export const createTask = (newTask) => {
  return async (dispatch, getState) => {
    const selectedProject = getState().projects.selected;
    const task = await taskService.createNew({
      ...newTask,
      project: selectedProject.id
    });
    dispatch({
      type: 'CREATE_TASK',
      task
    });
    const taskBoard = {
      ...selectedProject.taskBoard,
      [task.status.id]: [ ...selectedProject.taskBoard[task.status.id], task.id ]
    };
    const project = { ...selectedProject, taskBoard };
    const updatedProject = await projectService.update(project);
    dispatch({
      type: 'UPDATE_PROJECT',
      project: updatedProject
    });
    dispatch({
      type: 'CHANGE_SELECTED',
      project: updatedProject
    });
  };
};

export const updateTask = (task, project) => async dispatch => {
  const updatedTask = await taskService.update(task);
  dispatch({
    type: 'UPDATE_TASK',
    task: updatedTask
  });
  const updatedProject = await projectService.update(project);
  dispatch({
    type: 'UPDATE_PROJECT',
    project: updatedProject
  });
  dispatch({
    type: 'CHANGE_SELECTED',
    project: updatedProject
  });
};

export const changeStatus = (task, status) => {
  const { info, ...taskToSave } = { ...task, status };
  return updateTask(taskToSave, info);
};

export const changePriority = (task, direction) => {
  const { info, ...taskToSave } = {
    ...task,
    priority: direction === 'increase' ? task.priority + 1 : task.priority - 1
  };
  return updateTask(taskToSave, info);
};

export const toggleInfo = (task) => {
  const updatedTask = { ...task, info: !task.info };
  return({
    type: 'UPDATE_TASK',
    task: updatedTask
  });
};

export const removeTask = (task) => {
  return async (dispatch, getState) => {
    const selectedProject = getState().projects.selected;
    await taskService.remove(task);
    dispatch({
      type: 'DELETE_TASK',
      task
    });
    const taskBoard = {
      ...selectedProject.taskBoard,
      [task.status.id]: selectedProject.taskBoard[task.status.id]
        .filter(taskId => taskId !== task.id)
    };
    const project = { ...selectedProject, taskBoard };
    const updatedProject = await projectService.update(project);
    dispatch({
      type: 'UPDATE_PROJECT',
      project: updatedProject
    });
    dispatch({
      type: 'CHANGE_SELECTED',
      project: updatedProject
    });
  };
};


export default taskReducer;