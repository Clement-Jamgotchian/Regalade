// React components
import PropTypes from 'prop-types';

// Import Redux actions
import { useLocation } from 'react-router-dom';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// Styles import
import './DeleteIcon.scss';

// If recipe is in the list or favorite page, we show the delete icon instead of the favorite icon
function DeleteIcon({ removeRecipe }) {
  const location = useLocation();
  const hideDeleteButton = location.pathname === '/profil/mes-repas' || location.pathname === '/profil/mes-favorites';

  if (hideDeleteButton) {
    return (
      <button className="RecipeCard--deleteButton" type="button" onClick={removeRecipe}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    );
  }
}

DeleteIcon.propTypes = {
  removeRecipe: PropTypes.func.isRequired,
};

export default DeleteIcon;
