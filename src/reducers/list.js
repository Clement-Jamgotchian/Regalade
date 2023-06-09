import { ADD_RECIPE_TO_LIST } from '../actions/list';

export const initialState = {
  recipes: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_RECIPE_TO_LIST:
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe],
      };
    default:
      return state;
  }
};

export default reducer;
