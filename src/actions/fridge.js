export const SET_FRIDGE_VALUE = 'SET_FRIDGE_VALUE';
export const setFridgeValue = (currentFridgeValue) => ({
  type: SET_FRIDGE_VALUE,
  payload: {
    fridgeValue: currentFridgeValue,
  },
});
