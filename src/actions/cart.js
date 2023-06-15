export const CLEAR_INGREDIENT_REMOVED = 'CLEAR_INGREDIENT_REMOVED';
export const CART_UPDATED = 'CART_UPDATED';
export const CART_DELETED = 'CART_DELETED';
export const CLEAR_CART_DELETED = 'CLEAR_CART_DELETED';

export const clearIngredientRemoved = () => ({
  type: CLEAR_INGREDIENT_REMOVED,
});

export const updateCart = () => ({
  type: CART_UPDATED,
});

export const setcartDeleted = () => ({
  type: CART_DELETED,
});

export const clearCartDeleted = () => ({
  type: CLEAR_CART_DELETED,
});
