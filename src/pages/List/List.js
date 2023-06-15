// React components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';

// Local components
import Recipes from '../../components/Recipes/Recipes';
import Pagination from '../../components/Pagination/Pagination';

// Import Redux actions
import { clearRecipeRemoved, updateRecipesList, showOrHideAlert, newAlertMessage, changeAlertVariant } from '../../actions/list';

// Styles import
import './List.scss';
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
    await axios
      .get(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list${pageRequest}`,
      )
      .then((response) => {
        console.log(response.data);
        const recipes = response.data.recipesList.map((item) => ({
          ...item.recipe, userPortions: item.portions,
        }));
        setList(recipes);
        setPageCount(response.data.totalPages);
        dispatch(updateRecipesList({ action: 'init', length: recipes.length }));
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
    await axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart',
      )
      .then((response) => {
        console.log(response);
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
      })
      .catch((error) => {
        dispatch(newAlertMessage(error));
        dispatch(changeAlertVariant('danger'));
        dispatch(showOrHideAlert(true));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
      });
  };

  return (
    <div className="List">
      {show && (
        <Alert variant={alertVariant} onClose={() => dispatch(showOrHideAlert(false))} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="primary"
          className="List--generateCartButton border"
          onClick={(e) => {
            e.preventDefault();
            generateCart();
          }}
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
          <Link to="/profil/mes-courses">Générer ma liste de courses</Link>
        </Button>
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
