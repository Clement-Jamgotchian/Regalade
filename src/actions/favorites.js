export const ADD_RECIPE_TO_FAVORITES = 'ADD_RECIPE_TO_FAVORITES';
export const REMOVE_RECIPE_FROM_FAVORITES = 'REMOVE_RECIPE_FROM_FAVORITES';

export const addRecipeToFavorites = (data) => ({
  type: ADD_RECIPE_TO_FAVORITES,
  payload: {
    recipe: data,
  },
});

export const removeRecipeFromFavorites = (data) => ({
  type: REMOVE_RECIPE_FROM_FAVORITES,
  payload: {
    recipe: data,
  },
});
