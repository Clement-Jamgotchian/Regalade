import { SET_FRIDGE_VALUE } from '../actions/fridge';

const initialState = {
  fridge: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FRIDGE_VALUE:
      return {
        ...state,
        fridge: action.payload.fridgeValue,
      };
    default:
      return state;
  }
}

export default reducer;
