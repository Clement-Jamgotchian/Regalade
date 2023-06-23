// React components
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Styles import
import './FavoriteIcon.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToFavorites, removeRecipeFromFavorites, updateFavorites } from '../../../../actions/favorites';
import AxiosPrivate from '../../../../utils/AxiosPrivate';

// If user is logged in, we show the favorite icon,
// active or not depends if added on favorite list or not
// faHeart : filled heart
// farHeart : empty heart
function FavoriteIcon({ recipe }) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const recipeId = recipe.id;

  const favoritesRecipes = useSelector((store) => store.favorites.recipes);
  // eslint-disable-next-line eqeqeq
  const favoriteInit = favoritesRecipes.some((item) => item.id == recipeId);
  const [isFavorite, setIsFavorite] = useState();

  const location = useLocation();
  const hideFavoriteIcon = location.pathname === '/profil/mes-repas' || location.pathname === '/profil/mes-favorites';

  const className = isFavorite ? 'RecipeCard--favorite__active' : 'RecipeCard--favorite';
  const icon = isFavorite ? faHeart : farHeart;
  const dispatch = useDispatch();

  useEffect(() => { setIsFavorite(favoriteInit); }, [favoriteInit]);

  const removeRecipe = async () => {
    await AxiosPrivate
      .delete(
        `/favorite/${recipeId}`,
      )
      .then(() => {
        dispatch(removeRecipeFromFavorites(recipeId));
        dispatch(updateFavorites());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToFavorite = async () => {
    await AxiosPrivate
      .post(
        `/favorite/${recipeId}`,
      )
      .then(() => {
        dispatch(addRecipeToFavorites(recipe));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      removeRecipe();
    } else {
      addToFavorite();
    }
  };

  // eslint-disable-next-line eqeqeq
  if (isLoggedIn && !hideFavoriteIcon) {
    return (
      <button
        className="RecipeCard--buttonFavoriteToggle"
        type="button"
        onClick={toggleFavorite}
      >
        <FontAwesomeIcon className={className} icon={icon} />
      </button>
    );
  }
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picture: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    cookingDuration: PropTypes.number.isRequired,
    setupDuration: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    portions: PropTypes.number,
    userPortions: PropTypes.number,
  }).isRequired,
};

export default FavoriteIcon;
