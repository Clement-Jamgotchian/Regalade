export const RECIPES_LIST_UPDATED = 'RECIPES_LIST_UPDATED';
export const CLEAR_RECIPE_REMOVED = 'CLEAR_RECIPE_REMOVED';
export const PAGE_NUMBER = 'PAGE_NUMBER';

export const updateRecipesList = (data) => ({
  type: RECIPES_LIST_UPDATED,
  payload: {
    length: data.length,
    action: data.action,
  },
});

export const clearRecipeRemoved = () => ({
  type: CLEAR_RECIPE_REMOVED,
});

export const changePageNumber = (data) => ({
  type: PAGE_NUMBER,
  payload: {
    pageNumber: data,
  },
});
