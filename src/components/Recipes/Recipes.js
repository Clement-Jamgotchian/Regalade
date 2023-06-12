// React components
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

// Local components
import RecipeCard from '../RecipeCard/RecipeCard';

// Styles import
import './Recipes.scss';

function Recipes({ recipes }) {
  if (recipes.length === 0) {
    // return <Loading />;
  }

  return (
    <div className="Recipes--content">
      {recipes && (
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe.id} xs={12} md={4} lg={3}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

function PaginatedRecipes() {
  const [offset, setOffset] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState([]);
  const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);

  const getRecipes = async () => {
    axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes', { mode: 'cors' })
      .then((response) => {
        setTotalRecipes(response.data.length);
        setRecipes(response.data.slice(offset, offset + perPage));
        setPageCount(Math.ceil(response.data.length / perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = (selectedPage * perPage) % totalRecipes;
    setOffset(newOffset);
  };

  useEffect(() => {
    getRecipes();
  }, [offset]);

  return (
    <div className="Recipes">
      <Recipes recipes={recipes} />
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
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.shape.isRequired,
};

export default PaginatedRecipes;
