// React components
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

// Local components
import RecipeCard from '../RecipeCard/RecipeCard';

// Styles import
import './Recipes.scss';

function Recipes({ recipes }) {
  return (
    <div className="Recipes--content">
      {recipes && (
        <Row>
          {recipes.map((recipe) => (
            <Col key={`col-${recipe.id}`} xs={12} md={4} lg={3}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    cookingDuration: PropTypes.number.isRequired,
    setupDuration: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    rating: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default Recipes;
