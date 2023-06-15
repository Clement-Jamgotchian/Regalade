import { combineReducers } from 'redux';
import headerReducer from './header';
import userReducer from './user';
import listReducer from './list';
import favoritesReducer from './favorites';
import profilReducer from './profil';

const rootReducer = combineReducers({
  header: headerReducer,
  user: userReducer,
  list: listReducer,
  favorites: favoritesReducer,
  profil: profilReducer,
});

export default rootReducer;
