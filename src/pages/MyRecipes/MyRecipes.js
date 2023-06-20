// React components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';

// Local components
import Recipes from '../../components/Recipes/Recipes';
import Pagination from '../../components/Pagination/Pagination';

// Import Redux actions
import {
  clearRecipeRemoved,
  showOrHideAlert,
  newAlertMessage,
  changeAlertVariant,
} from '../../actions/list';

// Styles import
import './MyRecipes.scss';
import { clearCartDeleted } from '../../actions/cart';
import AxiosPrivate from '../../utils/AxiosPrivate';
import Modal from '../../components/MyRecipesModal/Modal';

// import { setActivPage, setCurrentButtonId } from '../../actions/profil';

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const recipeRemoved = useSelector((state) => state.list.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const getRecipes = async () => {
    await AxiosPrivate
      .get(
        `/recipes/my${pageRequest}`,
      )
      .then((response) => {
        const recipes = response.data.recipesList.map((item) => ({
          ...item.recipe,
          userPortions: item.portions,
        }));
        setMyRecipes(recipes);
        setPageCount(response.data.totalPages);
        dispatch(clearRecipeRemoved());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get recipes on first load + when a recipe has been deleted
  // from the list to udpate the view
  useEffect(() => {
    getRecipes();
  }, [recipeRemoved]);

  const generateCart = async () => {
    await AxiosPrivate
      .post(
        '/cart',
      )
      .then((response) => {
        console.log(response);
        dispatch(clearCartDeleted());
        dispatch(newAlertMessage('Votre liste de courses a bien été générée !'));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      })
      .catch((error) => {
        dispatch(newAlertMessage(error));
        dispatch(changeAlertVariant('danger'));
        dispatch(showOrHideAlert(true));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      });
  };

  return (
    <div className="List">
      <Stack direction="horizontal" gap={3}>
        {myRecipes.length > 0 && (
        <Button
          variant="primary"
          className="List--generateCartButton border"
          onClick={(e) => {
            e.preventDefault();
            generateCart();
          }}
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
          <Link to="/profil/mes-repas">Générer ma liste de courses</Link>
        </Button>
        )}
        <Button variant="success" className="List--addButton border ms-auto" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faPlus} />
        &nbsp;Créer une recette
        </Button>
      </Stack>
      <Recipes recipes={myRecipes} setRecipes={setMyRecipes} />
      <Pagination setRecipes={setMyRecipes} pageCount={pageCount} />
      <Modal show={show} setShow={setShow} />
    </div>
  );
}

export default MyRecipes;
