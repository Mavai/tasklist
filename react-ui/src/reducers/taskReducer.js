import taskService from '../services/tasks';
import projectService from '../services/projects';
import { updateProject } from './projectReducer';
import move from 'lodash-move';

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
    const taskBoard = {
      ...selectedProject.taskBoard,
      [task.status.id]: [ ...selectedProject.taskBoard[task.status.id], task.id ]
    };
    const project = { ...selectedProject, taskBoard };
    const updatedProject = await projectService.update(project);
    dispatch(updateProject(updatedProject));
  };
};

/**
 * Update the given task.
 * @param {object} task Task to update
 */
export const updateTask = (task, save=true) => async dispatch => {
  const updatedTask = save ? await taskService.update(task) : task;
  dispatch({
    type: 'UPDATE_TASK',
    task: updatedTask
  });
};

/**
 * Change status of a task and update current project's taskboard.
 * @param {object} taskBoard Current taskboard
 * @param {string} oldStatus Id of the orevious status
 * @param {string} newStatus Id of the new status
 * @param {number} sourceIndex Index in the previous column
 * @param {number} destinationIndex Index in the new column
 * @param {object} task Task to update
 */
export const changeTaskStatus = (taskBoard, oldStatus, newStatus,
  sourceIndex, destinationIndex, task) => async (dispatch, getState) => {
  const { all: projects, selected } = getState().projects;
  const selectedProject = projects
    .find(project => project.id === selected);
  const project = {
    ...selectedProject,
    taskBoard: calculateTaskBoard(taskBoard, oldStatus, newStatus, sourceIndex, destinationIndex, task)
  };
  dispatch(updateProject(project, false));
  dispatch(updateTask(task));
  const updatedProject = await projectService.update(project);
  dispatch(updateProject(updatedProject));
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
    const taskBoard = {
      ...selectedProject.taskBoard,
      [task.status.id]: selectedProject.taskBoard[task.status.id]
        .filter(taskId => taskId !== task.id)
    };
    const project = { ...selectedProject, taskBoard };
    const updatedProject = await projectService.update(project);
    dispatch(updateProject(updatedProject));
  };
};

/**
 * Calculates new taskboard when a taks's status is changed.
 * @param {object} taskBoard Current taskboard
 * @param {string} oldStatus Id of the orevious status
 * @param {string} newStatus Id of the new status
 * @param {number} sourceIndex Index in the previous column
 * @param {number} destinationIndex Index in the new column
 * @param {object} task Task to update
 */
const calculateTaskBoard = (taskBoard, oldStatus, newStatus, sourceIndex, destinationIndex, task) => {
  if (oldStatus !== newStatus) {
    return {
      ...taskBoard,
      [oldStatus]: taskBoard[oldStatus].filter((task, index) => index !== sourceIndex),
      [newStatus]: [
        ...taskBoard[newStatus].slice(0, destinationIndex),
        task.id,
        ...taskBoard[newStatus].slice(destinationIndex)
      ]
    };
  } else {
    return {
      ...taskBoard,
      [oldStatus]: move(taskBoard[oldStatus], sourceIndex, destinationIndex)
    };
  }
};


export default taskReducer;