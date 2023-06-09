import { SET_CONNECTED_USER } from '../actions/actions';

export const initialState = {
  isLoggedIn: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONNECTED_USER:
      return {
        ...state,
        isLoggedIn: action.payload.connectedUser,
      };

    default:
      return state;
  }
};

export default reducer;
