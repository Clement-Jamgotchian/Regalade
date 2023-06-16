// React components
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Styles import
import './FavoriteIcon.scss';
import { useSelector } from 'react-redux';

// If user is logged in, we show the favorite icon,
// active or not depends if added on favorite list or not
// faHeart : filled heart
// farHeart : empty heart
function FavoriteIcon({ recipeId, toggleFavorite }) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const favoritesRecipes = useSelector((store) => store.favorites.recipes);
  const isFavorite = favoritesRecipes.some((item) => item.id === recipeId);
  const location = useLocation();
  const hideFavoriteIcon = location.pathname === '/profil/mes-repas' || location.pathname === '/profil/mes-favorites';
  const className = isFavorite ? 'RecipeCard--favorite__active' : 'RecipeCard--favorite';
  const icon = isFavorite ? faHeart : farHeart;

  // eslint-disable-next-line eqeqeq
  if (isLoggedIn && !hideFavoriteIcon) {
    return (
      <button className="RecipeCard--buttonFavoriteToggle" type="button" onClick={toggleFavorite}>
        <FontAwesomeIcon className={className} icon={icon} />
      </button>
    );
  }
}

FavoriteIcon.propTypes = {
  recipeId: PropTypes.number.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default FavoriteIcon;
