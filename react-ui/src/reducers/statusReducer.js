import statusService from '../services/statuses';

const initialState = [];

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_STATUSES':
      return action.statuses;
    default:
      return state;
  }
};

export const initStatuses = () => {
  return async (dispatch) => {
    const statuses = await statusService.getAll();
    dispatch({
      type: 'INIT_STATUSES',
      statuses
    });
  };
};

export default statusReducer;