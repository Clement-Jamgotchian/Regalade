export const ADD_INGREDIENTS_TO_CART = 'ADD_INGREDIENTS_TO_CART';
export const REMOVE_INGREDIENT_FROM_CART = 'REMOVE_INGREDIENT_FROM_CART';
export const CHANGE_INGREDIENT_QUANTITY = 'CHANGE_INGREDIENT_QUANTITY';

export const addIngredientsToCart = (data) => ({
  type: ADD_INGREDIENTS_TO_CART,
  payload: {
    ingredients: data,
  },
});

export const removeIngredientFromCart = (data) => ({
  type: REMOVE_INGREDIENT_FROM_CART,
  payload: {
    ingredient: data,
  },
});

export const changeIngredientQuantity = (data) => ({
  type: CHANGE_INGREDIENT_QUANTITY,
  payload: {
    ingredient: data.ingredient,
    quantity: data.quantity,
  },
});
