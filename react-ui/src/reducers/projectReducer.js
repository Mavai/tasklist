import projectService from '../services/projects';

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

export const updateProject = (project) => async dispatch => {
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

export default projectReducer;