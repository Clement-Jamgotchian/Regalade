/* eslint-disable no-plusplus */

// React components
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChartSimple, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Import Redux actions
import { addRecipeToList } from '../../actions/list';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../actions/favorites';

// Styles import
import './RecipeCard.scss';

// Import local utils


// If user is logged in, we show the favorite icon,
// active or not depends if added on favorite list or not
// faHeart : filled heart
// farHeart : empty heart
function FavoriteIcon({ isLoggedIn, isFavorite, toggleFavorite }) {
  const className = isFavorite ? 'RecipeCard--favorite__active' : 'RecipeCard--favorite';
  const icon = isFavorite ? faHeart : farHeart;

  if (isLoggedIn) {
    return (
      <button className="RecipeCard--buttonFavoriteToggle" type="button" onClick={toggleFavorite}>
        <FontAwesomeIcon className={className} icon={icon} />
      </button>
    );
  }
}

// If user is logged in, we show the cart icon
function CartIcon({ isLoggedIn, addToList }) {
  if (isLoggedIn) {
    return (
      <button className="RecipeCard--buttonFavoriteToggle" type="button" onClick={addToList}>
        <FontAwesomeIcon className="RecipeCard--cart" icon={faCartPlus} />
      </button>
    );
  }
}

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(removeRecipeFromFavorites(recipe));
    } else {
      dispatch(addRecipeToFavorites(recipe));
    }
  };

  return (
    <Card className="RecipeCard">
      <FavoriteIcon
        isLoggedIn={isLoggedIn}
        isFavorite={favorite}
        toggleFavorite={toggleFavorite}
      />
      <Card.Img className="RecipeCard--img" variant="top" src={recipe.picture} />
      <Card.Body className="RecipeCard--body">
        <CartIcon isLoggedIn={isLoggedIn} addToList={() => dispatch(addRecipeToList(recipe))} />
        <Card.Title className="RecipeCard--title">{recipe.title}</Card.Title>
        <Card.Text>{recipe.id}</Card.Text>
        <Card.Text className="RecipeCard--rating">
          {getStars(recipe.rating)}
        </Card.Text>
        <Card.Text className="RecipeCard--content">
          <FontAwesomeIcon icon={farClock} />
          {getTotalDuration(recipe.cookingDuration, recipe.setupDuration)}
          <span> / </span>
          <FontAwesomeIcon icon={faChartSimple} />
          {getDifficultyLabel(recipe.difficulty)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

FavoriteIcon.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

CartIcon.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  addToList: PropTypes.func.isRequired,
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picture: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    cookingDuration: PropTypes.number.isRequired,
    setupDuration: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
  }),
};

RecipeCard.defaultProps = {
  recipe: ({
    id: -1,
    picture: 'https://picsum.photos/300/500',
    title: 'Titre par défaut',
    rating: 3.5,
    cookingDuration: 15,
    setupDuration: 20,
    difficulty: 1,
  }),
};

export default RecipeCard;
