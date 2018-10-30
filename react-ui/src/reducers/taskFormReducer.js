const initialState = {
  name: '',
  description: '',
  status: ''
};

const taskFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_TASK_FORM':
      return action.initialData;
    case 'UPDATE_FORM':
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

export const initializeForm = (initialData) => {
  return {
    type: 'INITIALIZE_TASK_FORM',
    initialData
  };
};

export const updateForm = (event, data) => {
  if (data) return ({
    type: 'UPDATE_FORM',
    name: data.name,
    value: data.value
  });
  else return ({
    type: 'UPDATE_FORM',
    name:[event.target.name] ,
    value: event.target.value
  });
};

export default taskFormReducer;