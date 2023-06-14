import axios from 'axios';
import { useEffect, useState } from 'react';
import Ingredients from '../../components/Ingredients/Ingredients';
import Loader from '../../components/Loader/Loader';

function Cart() {
  const [cart, setCart] = useState([]);
  const [departments, setDepartments] = useState([]);

  const getCart = async () => {
    await axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart')
      .then((response) => {
        setCart(response.data);
        const departmentsSet = new Set(
          response.data.map((item) => item.ingredient.department.name),
        );
        setDepartments(departmentsSet);
        console.log(departmentsSet);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="Cart">
      {cart ? (
        <Ingredients departments={departments} cart={cart} />
      ) : (
        <Loader />
      )}
      ;
    </div>
  );
}

export default Cart;
