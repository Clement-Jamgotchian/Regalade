/* eslint-disable no-plusplus */
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

function Recipes({ currentRecipes }) {
  if (currentRecipes.length === 0) {
    // return <Loading />;
  }
}

function PaginatedRecipes() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    const res = await axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes');
    const slice = res.data.slice(offset, offset + perPage);
    const postData = slice.map((recipe) => (
      <Col key={recipe.id} xs={12} md={4} lg={3}>
        <RecipeCard recipe={recipe} />
      </Col>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div className="Recipes--content">
      <Row>
        {data}
      </Row>
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
}

Recipes.propTypes = {
  currentRecipes: PropTypes.shape.isRequired,
};

export default PaginatedRecipes;
