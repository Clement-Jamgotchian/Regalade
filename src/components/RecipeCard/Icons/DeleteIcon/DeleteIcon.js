// React components
import PropTypes from 'prop-types';

// Import Redux actions
import { useLocation } from 'react-router-dom';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// Styles import
import './DeleteIcon.scss';

// If recipe is in the list page, we show the delete icon instead of the favorite icon
function DeleteIcon({ removeFromList }) {
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';

  if (isInPageList) {
    return (
      <button className="RecipeCard--deleteButton" type="button" onClick={removeFromList}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    );
  }
}

DeleteIcon.propTypes = {
  removeFromList: PropTypes.func.isRequired,
};

export default DeleteIcon;
