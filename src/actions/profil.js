export const SET_WIDTH_VALUE = 'SET_WIDTH_VALUE';
export const setWidthValue = (Value) => ({
  type: SET_WIDTH_VALUE,
  payload: {
    isTrue: Value,
  },
});
