// React components
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Pagination({ setRecipes, pageCount }) {
  const searchBarValue = useSelector((store) => store.header.searchBarValue);

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const baseUrl = 'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes?';
    const request = (searchBarValue !== undefined && searchBarValue !== '') ? `search=${searchBarValue}&page=${selectedPage}` : `page=${selectedPage}`;

    axios.get(baseUrl + request)
      .then((response) => {
        setRecipes(response.data.recipes);
      })
      .catch((error) => {
        console.log(error);
      });
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
