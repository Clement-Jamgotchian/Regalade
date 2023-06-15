// React components
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

// Local components
import IngredientCard from '../IngredientCard/IngredientCard';

// Import styles
import './Department.scss';

function Department({ department, ingredients }) {
  return (
    <div className="Department">
      <Row>
        <div className="Department--title">{department}</div>
        {ingredients
          .filter((el) => el.ingredient.department.name === department)
          .map((item) => (
            <Col key={item.ingredient.id + item.quantity} xs={12} md={4} lg={3}>
              <IngredientCard ingredient={item.ingredient} quantity={item.quantity} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

Department.propTypes = {
  department: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isCold: PropTypes.bool.isRequired,
      unit: PropTypes.string.isRequired,
      department: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

export default Department;