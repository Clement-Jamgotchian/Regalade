export const ADD_RECIPE_TO_LIST = 'ADD_RECIPE_TO_LIST';

export const addRecipeToList = (data) => ({
  type: ADD_RECIPE_TO_LIST,
  payload: {
    recipe: data,
  },
});
