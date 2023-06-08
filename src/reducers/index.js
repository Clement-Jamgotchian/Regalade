import { combineReducers } from 'redux';
import headerReducer from './header';
// import userReducer from './user';

const rootReducer = combineReducers({
  header: headerReducer,
//   user: userReducer,
});

export default rootReducer;
