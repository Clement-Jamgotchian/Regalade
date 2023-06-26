// React components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './RecipesPage.scss';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { showOrHideAlert } from '../../actions/list';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';
import { addRecipeToFavorites } from '../../actions/favorites';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [title, setTitle] = useState('Toutes les recettes');
  const searchBarValue = useSelector((store) => store.header.searchBarValue);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const favorites = useSelector((state) => state.favorites.recipes);
  const page = pageNumber > 0 ? `&page=${pageNumber}` : '';
  const baseUrl = '/recipes?';
  const location = useLocation();
  const locationSearch = (location.search).split('&');
  const filterRequest = (locationSearch[0]).replace(/\?/g, '');
  const searchRequest = (searchBarValue !== undefined && searchBarValue !== '') ? `&search=${searchBarValue}` : '';
  const dispatch = useDispatch();

  const getRecipes = async () => {
    AxiosPublic.get(baseUrl + filterRequest + searchRequest + page)
      .then((response) => {
        setRecipes(response.data.recipes);
        setPageCount(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const getTitle = () => {
    if (searchBarValue !== undefined && searchBarValue !== '') {
      setTitle(`Résulats de votre recherche : ${searchBarValue}`);
    }
    if (locationSearch[0].includes('category')) {
      const name = decodeURIComponent((locationSearch[1]).replace(/name=/, ''));
      setTitle(`Toutes les recettes de la catégorie : ${name}`);
    }
    if (location.search === '') {
      setTitle('Toutes les recettes');
    }
  };

  useEffect(() => {
    if (favorites.length === 0) {
      getFavorites();
    }
  }, []);

  useEffect(() => {
    getRecipes();
    getTitle();
  }, [searchBarValue, location.search]);

  return (
    <div className="RecipesPage">
      {recipes ? (
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
          <section>
            <Card>
              <Card.Body>
                <h2>{title}</h2>
                { recipes.length === 0 && (<Loader />)}
                <Recipes recipes={recipes} />
              </Card.Body>
            </Card>
          </section>
          <Pagination setRecipes={setRecipes} pageCount={pageCount} />
        </>
      )
        : (
          <section>
            <Card>
              <Card.Body>
                <h2>
                  Aucun résultat ne correspond à votre recherche :
                  {' '}
                  {searchBarValue}
                </h2>
                <Recipes recipes={recipes} />
              </Card.Body>
            </Card>
            {/* <Loader /> */}
          </section>
        )}
    </div>
  );
}

export default RecipesPage;
