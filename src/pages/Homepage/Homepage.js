// React components
import axios from 'axios';
import { useEffect, useState } from 'react';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './Homepage.scss';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getRecipes = async () => {
    axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes')
      .then((response) => {
        setRecipes(response.data.recipes);
        setPageCount(response.data.totalPages);
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
      {recipes ? (
        <>
          <Recipes recipes={recipes} />
          <Pagination setRecipes={setRecipes} pageCount={pageCount} />
        </>
      )
        : <Loader />}
    </div>
  );
}

export default Homepage;
