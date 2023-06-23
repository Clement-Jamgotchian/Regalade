// React components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, Stack } from 'react-bootstrap';

// Local components
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './Homepage.scss';
import Loader from '../../components/Loader/Loader';
import { showOrHideAlert } from '../../actions/list';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';
import { addRecipeToFavorites } from '../../actions/favorites';

function Homepage() {
  const [starterRecipes, setStarterRecipes] = useState([]);
  const [dishRecipes, setDishRecipes] = useState([]);
  const [dessertRecipes, setDessertRecipes] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);
  const searchBarValue = useSelector((store) => store.header.searchBarValue);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const favorites = useSelector((state) => state.favorites.recipes);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const baseUrl = '/recipes/home?category=';
  const request = (searchBarValue !== undefined && searchBarValue !== '') ? `?search=${searchBarValue}&${pageRequest}` : `${pageRequest}`;
  const dispatch = useDispatch();

  const getRecipes = async () => {
    AxiosPublic.get(`${baseUrl}28${request}`)
      .then((response) => {
        setStarterRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    AxiosPublic.get(`${baseUrl}29${request}`)
      .then((response) => {
        setDishRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    AxiosPublic.get(`${baseUrl}30${request}`)
      .then((response) => {
        setDessertRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    AxiosPublic.get(`${baseUrl}new${request}`)
      .then((response) => {
        setNewRecipes(response.data);
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
      {starterRecipes.length > 0 ? (
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
          <Card>
            <Card.Body>
              <Stack direction="horizontal">
                <h2>Les nouvelles recettes</h2>
                <Button variant="outline-primary" className="p-2 ms-auto">
                  <Link to="/recettes">
                    Voir toutes les recettes
                    {' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Link>
                </Button>
              </Stack>
              <Recipes recipes={newRecipes} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Stack direction="horizontal">
                <h2>Les meilleures recettes d&apos;entrées</h2>
                <Button variant="outline-primary" className="p-2 ms-auto">
                  <Link to="/recettes?category=28&name=Entrées">
                    Voir toutes les recettes
                    {' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Link>
                </Button>
              </Stack>
              <Recipes recipes={starterRecipes} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Stack direction="horizontal">
                <h2>Les meilleures recettes de plat</h2>
                <Button variant="outline-primary" className="p-2 ms-auto">
                  <Link to="/recettes?category=29&name=Plat">
                    Voir toutes les recettes
                    {' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Link>
                </Button>
              </Stack>
              <Recipes recipes={dishRecipes} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Stack direction="horizontal">
                <h2>Les meilleures recettes de dessert</h2>
                <Button variant="outline-primary" className="p-2 ms-auto">
                  <Link to="/recettes?category=30&name=Dessert">
                    Voir toutes les recettes
                    {' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Link>
                </Button>
              </Stack>
              <Recipes recipes={dessertRecipes} />
            </Card.Body>
          </Card>
        </>
      )
        : <Loader />}
    </div>
  );
}

export default Homepage;
