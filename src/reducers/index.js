import { combineReducers } from 'redux';
import userReducer from './user';
import listReducer from './list';

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
});

export default rootReducer;
