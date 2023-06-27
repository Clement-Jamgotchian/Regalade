import {
  SET_CONNECTED_USER, SET_LOADING_VALUE, SET_TOKEN_USER, SET_NICKNAME_USER, SET_INVITED_USER,
} from '../actions/user';

export const initialState = {
  isLoggedIn: true,
  isLoading: false,
  isInvitedIn: true,
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

    case SET_INVITED_USER:
      return {
        ...state,
        isInvitedIn: action.payload.invitedUser,
      };

    case SET_NICKNAME_USER:
      return {
        ...state,
        nicknameUser: action.payload.newNicknameValue,
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
