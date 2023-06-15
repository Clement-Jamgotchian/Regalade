// React components
import axios from 'axios';
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

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const searchBarValue = useSelector((store) => store.header.searchBarValue);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const pageRequest = pageNumber > 0 ? `page=${pageNumber}` : '';
  const baseUrl = 'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes';
  const request = (searchBarValue !== undefined && searchBarValue !== '') ? `?search=${searchBarValue}&${pageRequest}` : `?${pageRequest}`;
  const dispatch = useDispatch();

  const getRecipes = async () => {
    axios.get(baseUrl + request)
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
