import { createStore, combineReducers, applyMiddleware } from 'redux';
import taskReducer from './reducers/taskReducer';
import statusReducer from './reducers/statusReducer';
import projectReducer from './reducers/projectReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  tasks: taskReducer,
  statuses: statusReducer,
  projects: projectReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;