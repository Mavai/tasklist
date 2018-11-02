import projectService from '../services/projects';
import move from 'lodash-move';

const initialState = {
  all: [],
  selected: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_PROJECTS': {
      const { projects, selected } = action;
      return { ...state, all: projects, selected };
    }
    case 'CHANGE_SELECTED':
      return { ...state, selected: action.project };
    case 'UPDATE_PROJECT': {
      let filteredProjects = state.all.filter(project => project.id !== action.project.id);
      return {
        ...state,
        all: [...filteredProjects, action.project]
      };
    }
    default:
      return state;
  }
};

export const initProjects = () => {
  const selected = JSON.parse(localStorage.getItem('selectedProject'));
  return async (dispatch) => {
    const projects = await projectService.getAll();
    dispatch({
      type: 'INIT_PROJECTS',
      projects,
      selected
    });
  };
};

export const selectProject = (project) => {
  localStorage.setItem('selectedProject', JSON.stringify(project));
  return ({
    type: 'CHANGE_SELECTED',
    project
  });
};

export const updateProject = (project, save=true) => async dispatch => {
  const updatedProject = save ? await projectService.update(project) : project;
  dispatch({
    type: 'UPDATE_PROJECT',
    project: updatedProject
  });
};

export const updateTaskBoard = ( method, project, task, boardInfo) => {
  switch (method) {
    case 'add': {
      return addTaskToBoard(project, task);
    }
    case 'remove': {
      return removeTaskFromBoard(project, task);
    }
    case 'update': {
      return updateTaskOnBoard(project, task, boardInfo);
    }
    default: return;
  }
};

const addTaskToBoard = (project, task) => async dispatch => {
  const taskBoard = {
    ...project.taskBoard,
    [task.status.id]: [ ...project.taskBoard[task.status.id], task.id ]
  };
  const updatedProject = await projectService.update({ ...project, taskBoard });
  dispatch(updateProject(updatedProject));
};

const removeTaskFromBoard = (project, task) => async dispatch => {
  const taskBoard = {
    ...project.taskBoard,
    [task.status.id]: project.taskBoard[task.status.id]
      .filter(taskId => taskId !== task.id)
  };
  const updatedProject = await projectService.update({ ...project, taskBoard });
  dispatch(updateProject(updatedProject));
};

const updateTaskOnBoard = (project, task, boardInfo) => async dispatch => {
  let updatedProject = {
    ...project,
    taskBoard: calculateTaskBoard(project.taskBoard, task, boardInfo)
  };
  dispatch(updateProject(updatedProject, false));
  updatedProject = await projectService.update(updatedProject);
  dispatch(updateProject(updatedProject));
};

/**
 * Calculates new taskboard when a taks's status is changed.
 * @param {object} taskBoard Current taskboard
 * @param {object} task Task to update
 * @param {object} boardInfo Information needed to calculate the new taskboad
 * @param {string} boardInfo.oldStatus Id of the orevious status
 * @param {string} boardInfo.newStatus Id of the new status
 * @param {number} boardInfo.sourceIndex Index in the previous column
 * @param {number} boardInfodestinationIndex Index in the new column
 */
const calculateTaskBoard = (taskBoard, task, boardInfo) => {
  const { oldStatus, newStatus, sourceIndex, destinationIndex } = boardInfo;
  if (oldStatus !== newStatus) {
    return {
      ...taskBoard,
      [oldStatus]: taskBoard[oldStatus].filter((taskId) => taskId !== task.id),
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

export default projectReducer;