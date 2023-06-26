// React components
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePageNumber, updateRecipesList } from '../../actions/list';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';
import { setSuggestedRecipes } from '../../actions/fridge';

function Pagination({ setRecipes, pageCount }) {
  const searchBarValue = useSelector((store) => store.header.searchBarValue);
  const location = useLocation();
  const isInPageList = location.pathname === '/recettes';
  const isInPageFridge = location.pathname === '/profil/mes-ingredients';
  const dispatch = useDispatch();

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const endpoint = '/recipes';
    const endpoints = isInPageFridge ? '/fridge/suggestion' : '/list';
    const request = searchBarValue !== undefined && searchBarValue !== ''
      ? `?search=${searchBarValue}&page=${selectedPage}`
      : `?page=${selectedPage}`;

    if (isInPageList) {
      AxiosPublic.get(endpoint + request)
        .then((response) => {
          setRecipes(response.data.recipes);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      AxiosPrivate.get(endpoints + request)
        .then((response) => {
          if (isInPageFridge) {
            const recipes = response.data.recipes.map(
              (recipe) => recipe.recipe,
            );
            setRecipes(recipes);
            dispatch(setSuggestedRecipes(response.data.recipes));
          } else {
            const recipes = response.data.recipesList.map(
              (item) => item.recipe,
            );
            setRecipes(recipes);
            dispatch(changePageNumber(selectedPage));
            dispatch(
              updateRecipesList({
                action: 'paginate',
                length: response.data.recipes.length,
              }),
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="Recipes--pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
    </div>
  );
}

Pagination.propTypes = {
  setRecipes: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Pagination;
