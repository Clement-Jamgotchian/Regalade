export const SET_LOADING_VALUE = 'SET_LOADING_VALUE';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';

export const setLoadingValue = (newLoadValue) => ({
  type: SET_LOADING_VALUE,
  payload: {
    // eslint-disable-next-line object-shorthand
    newLoadValue: newLoadValue,
  },
});

export const setConnectedUser = (connectedUser) => ({
  type: SET_CONNECTED_USER,
  payload: {
    // eslint-disable-next-line object-shorthand
    connectedUser: connectedUser,
  },
});
