// React components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Import Redux actions
import { clearRecipeRemoved, updateRecipesList } from '../../actions/list';

// Styles import
import './List.scss';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';

function List() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const recipeRemoved = useSelector((state) => state.list.recipeRemoved);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `?page=${pageNumber}` : '';
  const dispatch = useDispatch();

  const getList = async () => {
    await axios.get(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list${pageRequest}`)
      .then((response) => {
        const recipes = response.data.recipesList.map((item) => item.recipe);
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

  if (list.length === 0) {
    <Button>
      <Link to="/recipes">Ajoutez votre première recette à votre liste de repas</Link>
    </Button>;
  }

  return (
    <div className="List">
      {list ? (
        <>
          <Recipes recipes={list} setRecipes={setList} />
          <Pagination setRecipes={setList} pageCount={pageCount} />
        </>
      )
        : <Loader />}
    </div>
  );
}

export default List;
