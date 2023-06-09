import { SET_CONNECTED_USER, SET_LOADING_VALUE } from '../actions/user';

export const initialState = {
  isLoggedIn: true,
  isLoading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONNECTED_USER:
      return {
        ...state,
        isLoggedIn: action.payload.connectedUser,
      };

    case SET_LOADING_VALUE:
      return {
        ...state,
        isLoading: action.payload.newLoadValue,
      };

    default:
      return state;
  }
};

export default reducer;
