export const SET_LOADING_VALUE = 'SET_LOADING_VALUE';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';

export const SET_TOKEN_USER = 'SET_TOKEN_USER';

export const SET_NICKNAME_USER = 'SET_NICKNAME_USER';

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

export const setTokenUser = (newTokenValue) => ({
  type: SET_TOKEN_USER,
  payload: {
    // eslint-disable-next-line object-shorthand
    newTokenValue: newTokenValue,
  },
});

export const setNewNickname = (newNicknameValue) => ({
  type: SET_TOKEN_USER,
  payload: {
    nicknameUser: newNicknameValue,
  },
});
