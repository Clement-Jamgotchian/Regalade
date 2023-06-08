import { SET_CONNECTED_USER } from '../actions/actions';

export const initialState = {
  isLoggedIn: true,
  connectedUser: false,
  user: [{
    email: 'tutu@admin.com',
    password: 'test',
  }],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONNECTED_USER:
      return {
        ...state,
        connectedUser: action.payload.connectedUser,
      };

    default:
      return state;
  }
};

export default reducer;
