import { ADD_RECIPE_TO_FAVORITES, CLEAR_RECIPES, CLEAR_RECIPE_REMOVED, FAVORITES_UPDATED, REMOVE_RECIPE_FROM_FAVORITES } from '../actions/favorites';

export const initialState = {
  recipes: [],
  recipeRemoved: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_RECIPE_TO_FAVORITES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe],
      };
    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: [],
      };

    case REMOVE_RECIPE_FROM_FAVORITES:
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== action.payload.recipe),
      };

    case CLEAR_RECIPE_REMOVED:
      return {
        ...state,
        recipeRemoved: false,
      };

    case FAVORITES_UPDATED:
      return {
        ...state,
        recipeRemoved: true,
      };

    default:
      return state;
  }
};

export default reducer;
