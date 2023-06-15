import axios from 'axios';
import { useEffect, useState } from 'react';

function Ingredient() {
  const [setIngredients] = useState([]);

  const getCart = async () => {
    await axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart')
      .then((response) => {
        console.log(response);
        setIngredients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <p>test</p>
  );
}

export default Ingredient;
