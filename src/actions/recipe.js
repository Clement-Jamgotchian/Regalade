export const SET_RECIPE_EDIT = 'SET_RECIPE_EDIT';

export const setRecipeToEdit = (newRecipe) => ({
  type: SET_RECIPE_EDIT,
  payload: {
    // eslint-disable-next-line object-shorthand
    newRecipe: newRecipe,
  },
});
