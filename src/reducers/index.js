import { combineReducers } from 'redux';
import headerReducer from './header';
import userReducer from './user';
import listReducer from './list';
import favoritesReducer from './favorites';

const rootReducer = combineReducers({
  header: headerReducer,
  user: userReducer,
  list: listReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
