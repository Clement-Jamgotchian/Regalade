export const SET_FRIDGE_VALUE = 'SET_FRIDGE_VALUE';
export const setFridgeValue = (currentFridgeValue) => ({
  type: SET_FRIDGE_VALUE,
  payload: {
    fridgeValue: currentFridgeValue,
  },
});

export const SET_SUGGESTED_RECIPES = 'SET_SUGGESTED_RECIPES';
export const setSuggestedRecipes = (suggestedList) => ({
  type: SET_SUGGESTED_RECIPES,
  payload: {
    suggest: suggestedList,
  },
});
