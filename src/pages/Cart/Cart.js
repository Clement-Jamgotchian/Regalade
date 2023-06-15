// React components
import { useEffect, useState } from 'react';
import axios from 'axios';

// Local components
import Ingredients from '../../components/Ingredients/Ingredients';
import Loader from '../../components/Loader/Loader';

function Cart() {
  const [departments, setDepartments] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getCart = async () => {
    await axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart')
      .then((response) => {
        console.log(response.data);
        setIngredients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCart();
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
