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

export default projectReducer;