export const RECIPES_LIST_UPDATED = 'RECIPES_LIST_UPDATED';
export const CLEAR_RECIPE_REMOVED = 'CLEAR_RECIPE_REMOVED';
export const PAGE_NUMBER = 'PAGE_NUMBER';
export const SHOW_OR_HIDE_ALERT = 'SHOW_OR_HIDE_ALERT';
export const ALERT_MESSAGE = 'ALERT_MESSAGE';
export const ALERT_VARIANT = 'ALERT_VARIANT';

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

export const showOrHideAlert = (data) => ({
  type: SHOW_OR_HIDE_ALERT,
  payload: {
    showAlert: data,
  },
});

export const newAlertMessage = (data) => ({
  type: ALERT_MESSAGE,
  payload: {
    alertMessage: data,
  },
});

export const changeAlertVariant = (data) => ({
  type: ALERT_VARIANT,
  payload: {
    alertVariant: data,
  },
});
