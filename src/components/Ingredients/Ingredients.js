// React components
import PropTypes from 'prop-types';

// Local components
import Department from '../Department/Department';

// Import styles
import './Ingredients.scss';

function Ingredients({ departments, cart }) {
  return (
    <div className="Ingredients">
      {cart && (
        <>
          {Array.from(departments).map((department) => (
            <Department department={department} cart={cart} />
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
  cart: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
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
