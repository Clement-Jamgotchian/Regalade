// React components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './Homepage.scss';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { showOrHideAlert } from '../../actions/list';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';
import { addRecipeToFavorites } from '../../actions/favorites';

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const searchBarValue = useSelector((store) => store.header.searchBarValue);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const favorites = useSelector((state) => state.favorites.recipes);
  const pageRequest = pageNumber > 0 ? `page=${pageNumber}` : '';
  const baseUrl = '/recipes';
  const request = (searchBarValue !== undefined && searchBarValue !== '') ? `?search=${searchBarValue}&${pageRequest}` : `?${pageRequest}`;
  const dispatch = useDispatch();

  const getRecipes = async () => {
    AxiosPublic.get(baseUrl + request)
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
  }, [searchBarValue]);

  const getFavorites = async () => {
    await AxiosPrivate
      .get(
        '/favorite',
      )
      .then((response) => {
        response.data.recipes.map((recipe) => dispatch(addRecipeToFavorites(recipe)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (favorites.length === 0) {
      getFavorites();
    }
  }, []);

  return (
    <div className="Homepage">
      {recipes.length > 0 ? (
        <>
          {showAlert && (
            <Alert
              variant={alertVariant}
              onClose={() => dispatch(showOrHideAlert(false))}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Recipes recipes={recipes} />
          <Pagination setRecipes={setRecipes} pageCount={pageCount} />
        </>
      )
        : <Loader />}
    </div>
  );
}

export default Homepage;
