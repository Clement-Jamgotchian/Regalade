import { combineReducers } from 'redux';
import headerReducer from './header';
import userReducer from './user';
import listReducer from './list';
import favoritesReducer from './favorites';
import profilReducer from './profil';
import fridgeReducer from './fridge';

const rootReducer = combineReducers({
  header: headerReducer,
  user: userReducer,
  list: listReducer,
  favorites: favoritesReducer,
  profil: profilReducer,
  fridge: fridgeReducer,
});

export default rootReducer;
