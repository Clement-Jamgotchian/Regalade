import {
  SET_RECIPE_EDIT,
} from '../actions/recipe';

export const initialState = {
  recipe: [],
};

const recipe = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECIPE_EDIT:
      return {
        ...state,
        recipe: action.payload.newRecipe,
      };

    default:
      return state;
  }
};

export default recipe;
