import taskService from '../services/tasks';
import { updateTaskBoard } from './projectReducer';

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

/**
 * Fetch all tasks from the given project.
 * @param {number} id Id of project whose tasks will be fetched
 */
export const initTasks = (id) => {
  return async (dispatch) => {
    const tasks = await taskService.getAllFromProject(id);
    dispatch({
      type: 'INIT_TASKS',
      tasks
    });
  };
};

/**
 * Create a new task and update current project's taskboard.
 * @param {object} newTask Task to create
 */
export const createTask = (newTask) => {
  return async (dispatch, getState) => {
    const { all: projects, selected } = getState().projects;
    const selectedProject = projects
      .find(project => project.id === selected);
    const task = await taskService.createNew({
      ...newTask,
      project: selectedProject.id
    });
    dispatch({
      type: 'CREATE_TASK',
      task
    });
    dispatch(updateTaskBoard('add', selectedProject, task));
  };
};

/**
 * Update the given task.
 * @param {object} task Task to update
 */
export const updateTask = (task, save=true, boardInfo) => async (dispatch, getState) => {
  const updatedTask = save ? await taskService.update(task) : task;
  dispatch({
    type: 'UPDATE_TASK',
    task: updatedTask
  });
  if (boardInfo) {
    const { all: projects, selected } = getState().projects;
    const selectedProject = projects
      .find(project => project.id === selected);
    dispatch(updateTaskBoard('update', selectedProject, updatedTask, boardInfo));
  }
};

/**
 * Change status of a task and update current project's taskboard.
 * @param {object} task Task to update
 */
export const changeTaskStatus = (task, boardInfo) => async (dispatch, getState) => {
  dispatch(updateTask(task));
  const { all: projects, selected } = getState().projects;
  const selectedProject = projects
    .find(project => project.id === selected);
  dispatch(updateTaskBoard('update', selectedProject, task, boardInfo));
};

/**
 * Remove the given task and update currently selected project's taskboard.
 * @param {object} task Task to remove.
 */
export const removeTask = (task) => {
  return async (dispatch, getState) => {
    const { all: projects, selected } = getState().projects;
    const selectedProject = projects
      .find(project => project.id === selected);
    await taskService.remove(task);
    dispatch({
      type: 'DELETE_TASK',
      task
    });
    updateTaskBoard('remove', selectedProject, task);
  };
};

export default taskReducer;