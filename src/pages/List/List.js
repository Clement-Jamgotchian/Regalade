// React components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Import Redux actions
import { clearRecipeRemoved, updateRecipesList } from '../../actions/list';

// Styles import
import './List.scss';
import Pagination from '../../components/Pagination/Pagination';
import { setActivPage, setCurrentButtonId } from '../../actions/profil';

function List() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const recipeRemoved = useSelector((state) => state.list.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getList = async () => {
    await axios
      .get(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list${pageRequest}`,
      )
      .then((response) => {
        const recipes = response.data.recipesList.map((item) => ({
          ...item.recipe,
          portions: item.portions,
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

  const generateCart = async () => {
    await axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart',
      )
      .then((response) => {
        console.log(response);
        navigate('/profil/mes-courses');
      })
      .catch((error) => console.log(error));
  };

  // Get recipes on first load + when a recipe has been deleted
  // from the list to udpate the view
  useEffect(() => {
    getList();
  }, [recipeRemoved]);

  return (
    <div className="List">
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="primary"
          className="List--generateCartButton border"
          onClick={generateCart}
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
          <Link
            to="/"
            onClick={() => {
              dispatch(setCurrentButtonId(5));
              dispatch(setActivPage('/profil/mes-courses'));
            }}
          >
            Générer ma liste de courses
          </Link>
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
