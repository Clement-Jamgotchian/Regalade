// React components
import axios from 'axios';
import { useEffect, useState } from 'react';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './Homepage.scss';
import Loader from '../../components/Loader/Loader';

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes', { mode: 'cors' })
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="Homepage">
      {recipes
        ? <Recipes recipes={recipes} />
        : <Loader />}
    </div>
  );
}

export default Homepage;
