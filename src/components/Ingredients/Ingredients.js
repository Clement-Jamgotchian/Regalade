// React components
import PropTypes from 'prop-types';

// Local components
import Department from '../Department/Department';

// Import styles
import './Ingredients.scss';

function Ingredients({ departments, ingredients }) {
  return (
    <div className="Ingredients">
      {ingredients && (
        <>
          {Array.from(departments).map((department) => (
            <Department key={department} department={department} ingredients={ingredients} />
          ))}
        </>
      )}
    </div>
  );
}

Ingredients.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    department: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
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

export default Ingredients;
