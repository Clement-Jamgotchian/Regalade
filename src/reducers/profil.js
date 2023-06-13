import { SET_WIDTH_VALUE } from '../actions/profil';

const initialState = {
  isTrueWidth: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WIDTH_VALUE:
      return {
        ...state,
        isTrueWidth: action.payload.isTrue,
      };
    default:
      return state;
  }
}

export default reducer;
