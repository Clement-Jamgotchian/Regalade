// React components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Local components
import Recipes from '../../components/Recipes/Recipes';
import Pagination from '../../components/Pagination/Pagination';

// Import Redux actions

// Styles import
import './Favorites.scss';
import { clearRecipeRemoved } from '../../actions/favorites';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const recipeRemoved = useSelector((state) => state.favorites.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();

  const getFavorites = async () => {
    await axios
      .get(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/favorite${pageRequest}`,
      )
      .then((response) => {
        setFavorites(response.data.recipes);
        setPageCount(response.data.totalPages);
        dispatch(clearRecipeRemoved());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get recipes on first load + when a recipe has been deleted
  // from the favorites to udpate the view
  useEffect(() => {
    getFavorites();
  }, [recipeRemoved]);

  return (
    <div className="Favorites">
      <Recipes recipes={favorites} setRecipes={setFavorites} />
      <Pagination setRecipes={setFavorites} pageCount={pageCount} />
    </div>
  );
}

export default Favorites;
