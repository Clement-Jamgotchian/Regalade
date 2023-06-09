export const SET_LOADING_VALUE = 'SET_LOADING_VALUE';

export const setLoadingValue = (newLoadValue) => ({
  type: SET_LOADING_VALUE,
  payload: {
    // eslint-disable-next-line object-shorthand
    newLoadValue: newLoadValue,
  },
});
