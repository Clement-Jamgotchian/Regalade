// React components
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Local components
import Ingredients from '../../components/Ingredients/Ingredients';
import Loader from '../../components/Loader/Loader';

function Cart() {
  const [departments, setDepartments] = useState([]);
  const ingredients = useSelector((store) => store.cart.ingredients);

  useEffect(() => {
    const departmentsSet = new Set(
      ingredients.map((item) => item.ingredient.department.name),
    );
    setDepartments(departmentsSet);
  }, [ingredients]);

  return (
    <div className="Cart">
      {ingredients ? (
        <Ingredients departments={departments} ingredients={ingredients} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Cart;
