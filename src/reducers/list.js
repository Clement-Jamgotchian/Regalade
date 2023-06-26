import { PAGE_NUMBER, CLEAR_RECIPE_REMOVED, RECIPES_LIST_UPDATED, SHOW_OR_HIDE_ALERT, ALERT_MESSAGE, ALERT_VARIANT } from '../actions/list';

export const initialState = {
  recipesListUpdated: 0,
  recipeRemoved: false,
  pageNumber: 0,
  showAlert: false,
  alertMessage: '',
  alertVariant: 'success',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_OR_HIDE_ALERT:
      return {
        ...state,
        showAlert: action.payload.showAlert,
      };
    case ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.payload.alertMessage,
      };
    case ALERT_VARIANT:
      return {
        ...state,
        alertVariant: action.payload.alertVariant,
      };
    case PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
      };
    case CLEAR_RECIPE_REMOVED:
      return {
        ...state,
        recipeRemoved: false,
      };
    case RECIPES_LIST_UPDATED:
      if (action.payload.action === 'init') {
        return {
          ...state,
          recipesListUpdated: action.payload.length,
        };
      }
      if (action.payload.action === 'paginate') {
        return {
          ...state,
          recipesListUpdated: state.recipesListUpdated + action.payload.length,
        };
      }
      if (action.payload.action === 'added') {
        return {
          ...state,
          recipesListUpdated: state.recipesListUpdated + 1,
        };
      }
      // if (action.payload.action === 'removed') {
      return {
        ...state,
        recipesListUpdated: state.recipesListUpdated - 1,
        recipeRemoved: true,
      };
    default:
      return state;
  }
};

export default reducer;
