import { ADD_INGREDIENTS_TO_CART, REMOVE_INGREDIENT_FROM_CART, CHANGE_INGREDIENT_QUANTITY } from '../actions/cart';

export const initialState = {
  ingredients: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_INGREDIENTS_TO_CART:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredients],
      };

    case REMOVE_INGREDIENT_FROM_CART:
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item.id !== action.payload.ingredient.id),
      };

    case CHANGE_INGREDIENT_QUANTITY:
      return {
        ...state,
        ingredients: state.ingredients.map((item) => ({
            ...item, 
          if (item.id === action.payload.ingredient.id) {
            item.quantity: action.payload.quantity,
          });
        }),
      };
      const recipes = response.data.recipesList.map((item) => ({
        ...item.recipe, portions: item.portions,
      }));

    default:
      return state;
  }
};

export default reducer;
