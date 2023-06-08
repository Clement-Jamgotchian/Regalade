/* eslint-disable no-plusplus */

// React components
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faStarHalfStroke, faCartPlus, faChartSimple, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClock as farClock, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Import Redux actions
import { addRecipeToList } from '../../actions/list';

// Styles import
import './RecipeCard.scss';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../actions/favorites';

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

  // Function to show fill stars depends on rating
  // faStar : filled star
  // faStarHalfStroke : half-filled star
  // farStart : empty star
  function getStars(starsRating) {
    const stars = [];
    // For each integer, we show a full star
    for (let i = 1; i <= 5; i++) {
      if (i <= starsRating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
      }
      // If rating is decimal, we show a half-filled star
      if (/^[1-4]+.[1-9]+$/.test(starsRating) && Math.floor(starsRating) === i) {
        stars.push(<FontAwesomeIcon key="half" icon={faStarHalfStroke} />);
        // We show other empty stars to have a total of 5 stars
      } else if (i > Math.ceil(starsRating)) {
        stars.push(<FontAwesomeIcon key={i} icon={farStar} />);
      }
    }
    return stars;
  }

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
        <Card.Text className="RecipeCard--rating">
          {getStars(recipe.rating)}
        </Card.Text>
        <Card.Text className="RecipeCard--content">
          <FontAwesomeIcon icon={farClock} />
          {recipe.time}
          <span> / </span>
          <FontAwesomeIcon icon={faChartSimple} />
          {recipe.difficulty}
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
    favorite: PropTypes.bool.isRequired,
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }),
};

RecipeCard.defaultProps = {
  recipe: ({
    id: -1,
    picture: 'https://picsum.photos/300/500',
    title: 'Titre par défaut',
    rating: 3.5,
    time: '15 min',
    difficulty: 'Facile',
  }),
};

export default RecipeCard;
