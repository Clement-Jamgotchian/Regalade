import {
  SET_CONNECTED_USER, SET_LOADING_VALUE, SET_TOKEN_USER, SET_NICKNAME_USER,
} from '../actions/user';

export const initialState = {
  isLoggedIn: false,
  isLoading: false,
  tokenUser: '',
  nicknameUser: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONNECTED_USER:
      return {
        ...state,
        isLoggedIn: action.payload.connectedUser,
      };

    case SET_NICKNAME_USER:
      return {
        ...state,
        nicknameUser: action.payload.nicknameUser,
      };

    case SET_LOADING_VALUE:
      return {
        ...state,
        isLoading: action.payload.newLoadValue,
      };

    case SET_TOKEN_USER:
      return {
        ...state,
        tokenUser: action.payload.newTokenValue,
      };

    default:
      return state;
  }
};

export default reducer;
