// React components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Local components
import Recipes from '../../components/Recipes/Recipes';
import Pagination from '../../components/Pagination/Pagination';

// Import Redux actions
import {
  clearRecipeRemoved,
  showOrHideAlert,

} from '../../actions/list';

// Styles import
import AxiosPrivate from '../../utils/AxiosPrivate';

// import { setActivPage, setCurrentButtonId } from '../../actions/profil';

function ListCreate() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const recipeRemoved = useSelector((state) => state.list.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const show = useSelector((state) => state.list.showAlert);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();
  console.log(list);
  const getList = async () => {
    await AxiosPrivate
      .get(
        `/recipes/my${pageRequest}`,
      )
      .then((response) => {
        const recipes = response.data.recipes.map((item) => ({
          ...item,
        }));
        console.log(recipes);
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
        <Button variant="success" className="List--addButton border ms-auto">
          <FontAwesomeIcon icon={faPlus} />
          <Link to="/recette/creation">Créer une recette</Link>
        </Button>
      </Stack>
      <Recipes recipes={list} setRecipes={setList} />
      <Pagination setRecipes={setList} pageCount={pageCount} />
    </div>
  );
}

export default ListCreate;
