// React components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Local components
import Ingredients from '../../components/Ingredients/Ingredients';
import { clearIngredientRemoved } from '../../actions/cart';
import AxiosPrivate from '../../utils/AxiosPrivate';

function Cart() {
  const [departments, setDepartments] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const ingredientRemoved = useSelector((state) => state.cart.ingredientRemoved);
  const cartDeleted = useSelector((store) => store.cart.cartDeleted);
  const dispatch = useDispatch();

  const getCart = async () => {
    if (!cartDeleted) {
      await AxiosPrivate.get('/cart')
        .then((response) => {
          setIngredients(response.data);
          const departmentsSet = new Set(
            response.data.map((item) => item.ingredient.department.name),
          );
          setDepartments(departmentsSet);
          dispatch(clearIngredientRemoved());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIngredients([]);
      setDepartments([]);
    }
  };

  useEffect(() => {
    getCart();
  }, [ingredientRemoved, cartDeleted]);

  return (
    <div className="Cart">
      <Ingredients departments={departments} ingredients={ingredients} />
    </div>
  );
}

export default Cart;
