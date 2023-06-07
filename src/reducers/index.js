import { combineReducers } from 'redux';
import userReducer from './user';
import listReducer from './list';
import favoritesReducer from './favorites';

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
