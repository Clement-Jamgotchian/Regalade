// React components
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

// Styles import
import './CartIcon.scss';

// If user is logged in, we show the cart icon
function CartIcon({ addToList }) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';

  if (isLoggedIn && !isInPageList) {
    return (
      <button className="RecipeCard--buttonFavoriteToggle" type="button" onClick={(e) => { e.preventDefault(); addToList(); }}>
        <FontAwesomeIcon className="RecipeCard--cart" icon={faCartPlus} />
      </button>
    );
  }
}

CartIcon.propTypes = {
  addToList: PropTypes.func.isRequired,
};

export default CartIcon;
