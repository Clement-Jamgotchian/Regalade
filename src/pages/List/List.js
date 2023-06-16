// React components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Stack } from 'react-bootstrap';
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
import './List.scss';
import { clearCartDeleted } from '../../actions/cart';
import AxiosPrivate from '../../utils/AxiosPrivate';

// import { setActivPage, setCurrentButtonId } from '../../actions/profil';

function List() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const recipeRemoved = useSelector((state) => state.list.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const show = useSelector((state) => state.list.showAlert);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();

  const getList = async () => {
    await AxiosPrivate
      .get(
        `/list${pageRequest}`,
      )
      .then((response) => {
        const recipes = response.data.recipesList.map((item) => ({
          ...item.recipe,
          userPortions: item.portions,
        }));
        setList(recipes);
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
    getList();
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
      {show && (
        <Alert
          variant={alertVariant}
          onClose={() => dispatch(showOrHideAlert(false))}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Stack direction="horizontal" gap={3}>
        {list.length > 0 && (
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
        <Button variant="success" className="List--addButton border ms-auto">
          <FontAwesomeIcon icon={faPlus} />
          <Link to="/recettes">Ajouter une recette</Link>
        </Button>
      </Stack>
      <Recipes recipes={list} setRecipes={setList} />
      <Pagination setRecipes={setList} pageCount={pageCount} />
    </div>
  );
}

export default List;
