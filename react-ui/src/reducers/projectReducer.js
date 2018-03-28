import projectService from '../services/projects'

const initialState = {
  all: [],
  selected: null
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_PROJECTS':
      return { ...state, all: action.projects }
    case 'CHANGE_SELECTED':
      return { ...state, selected: action.project }
    default:
      return state
  }
}

export const initProjects = () => {
  return async (dispatch) => {
    const projects = await projectService.getAll()
    dispatch({
      type: 'INIT_PROJECTS',
      projects
    })
  }
}

export const selectProject = (project) => {
  return ({
    type: 'CHANGE_SELECTED',
    project
  })
}

export default projectReducer