import { ADD_RECIPE_TO_FAVORITES, REMOVE_RECIPE_FROM_FAVORITES } from '../actions/favorites';

export const initialState = {
  recipes: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_RECIPE_TO_FAVORITES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe],
      };

    case REMOVE_RECIPE_FROM_FAVORITES:
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== action.payload.recipe.id),
      };

    default:
      return state;
  }
};

export default reducer;
