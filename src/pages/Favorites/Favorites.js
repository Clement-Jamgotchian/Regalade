// React components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Local components
import Recipes from '../../components/Recipes/Recipes';
import Pagination from '../../components/Pagination/Pagination';

// Import Redux actions

// Styles import
import './Favorites.scss';
import { addRecipeToFavorites, clearRecipeRemoved, clearRecipes } from '../../actions/favorites';
import AxiosPrivate from '../../utils/AxiosPrivate';

function Favorites() {
  // const [favorites, setFavorites] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const favorites = useSelector((state) => state.favorites.recipes);
  const recipeRemoved = useSelector((state) => state.favorites.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();

  const getFavorites = async () => {
    await AxiosPrivate
      .get(
        `/favorite${pageRequest}`,
      )
      .then((response) => {
        dispatch(clearRecipes());
        response.data.recipes.map((recipe) => dispatch(addRecipeToFavorites(recipe)));
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
      <Recipes recipes={favorites} />
      <Pagination setRecipes={() => dispatch(addRecipeToFavorites)} pageCount={pageCount} />
    </div>
  );
}

export default Favorites;
