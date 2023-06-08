export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';

export const setConnectedUser = (connectedUser) => ({
  type: SET_CONNECTED_USER,
  payload: {
    // eslint-disable-next-line object-shorthand
    connectedUser: connectedUser,
  },
});
