export const ADD_RECIPE_TO_FAVORITES = 'ADD_RECIPE_TO_FAVORITES';
export const REMOVE_RECIPE_FROM_FAVORITES = 'REMOVE_RECIPE_FROM_FAVORITES';
export const CLEAR_RECIPE_REMOVED = 'CLEAR_RECIPE_REMOVED';
export const FAVORITES_UPDATED = 'FAVORITES_UPDATED';

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

export const clearRecipeRemoved = () => ({
  type: CLEAR_RECIPE_REMOVED,
});

export const updateFavorites = () => ({
  type: FAVORITES_UPDATED,
});
