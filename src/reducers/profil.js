import { SET_WIDTH_VALUE, SET_CURRENT_BUTTON_ID } from '../actions/profil';

const initialState = {
  isTrueWidth: null,
  profilButtonId: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WIDTH_VALUE:
      return {
        ...state,
        isTrueWidth: action.payload.isTrue,
      };
    case SET_CURRENT_BUTTON_ID:
      return {
        ...state,
        profilButtonId: action.payload.currentButtonId,
      };
    default:
      return state;
  }
}

export default reducer;
