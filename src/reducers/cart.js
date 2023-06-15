import { CART_DELETED, CART_UPDATED, CLEAR_CART_DELETED, CLEAR_INGREDIENT_REMOVED } from '../actions/cart';

export const initialState = {
  ingredientRemoved: false,
  cartDeleted: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_INGREDIENT_REMOVED:
      return {
        ...state,
        ingredientRemoved: false,
      };

    case CART_UPDATED:
      return {
        ...state,
        ingredientRemoved: true,
      };

    case CART_DELETED:
      return {
        ...state,
        cartDeleted: true,
      };
    case CLEAR_CART_DELETED:
      return {
        ...state,
        cartDeleted: false,
      };
    default:
      return state;
  }
};

export default reducer;
