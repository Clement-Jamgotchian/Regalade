import { SET_FRIDGE_VALUE, SET_SUGGESTED_RECIPES } from '../actions/fridge';

const initialState = {
  fridge: '',
  listSuggested: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FRIDGE_VALUE:
      return {
        ...state,
        fridge: action.payload.fridgeValue,
      };
    case SET_SUGGESTED_RECIPES:
      return {
        ...state,
        listSuggested: action.payload.suggest,
      };
    default:
      return state;
  }
}

export default reducer;
