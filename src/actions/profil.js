export const SET_WIDTH_VALUE = 'SET_WIDTH_VALUE';
export const setWidthValue = (Value) => ({
  type: SET_WIDTH_VALUE,
  payload: {
    isTrue: Value,
  },
});
export const SET_CURRENT_BUTTON_ID = 'SET_CURRENT_BUTTON_ID';
export const setCurrentButtonId = (id) => ({
  type: SET_CURRENT_BUTTON_ID,
  payload: {
    currentButtonId: id,
  },
});
