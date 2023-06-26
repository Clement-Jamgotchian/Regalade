import { combineReducers } from 'redux';
import headerReducer from './header';
import userReducer from './user';
import listReducer from './list';
import favoritesReducer from './favorites';
import profilReducer from './profil';
import fridgeReducer from './fridge';
import cartReducer from './cart';
import recipeReducer from './recipe';

const rootReducer = combineReducers({
  header: headerReducer,
  user: userReducer,
  list: listReducer,
  favorites: favoritesReducer,
  profil: profilReducer,
  fridge: fridgeReducer,
  cart: cartReducer,
  recipe: recipeReducer,
});

export default rootReducer;
