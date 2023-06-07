/* eslint-disable no-plusplus */

// React components
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// Bootstrap components
import { Card } from 'react-bootstrap';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faStarHalfStroke, faCartPlus, faChartSimple, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClock as farClock, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Styles import
import './RecipeCard.scss';

// If user is logged in, we show the favorite icon,
// active or not depends if added on favorite list or not
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
function CartIcon({ isLoggedIn }) {
  if (isLoggedIn) {
    return <FontAwesomeIcon className="RecipeCard--cart" icon={faCartPlus} />;
  }
}

function RecipeCard({ recipe }) {
  // Function to show fill stars depends on rating
  function getStars(starsRating) {
    const stars = [];
    // For each integer, we show a full star
    for (let i = 1; i <= 5; i++) {
      if (i <= starsRating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
      }
      // If rating is decimal, we show a half star
      if (/^[1-4]+.[1-9]+$/.test(starsRating) && Math.floor(starsRating) === i) {
        stars.push(<FontAwesomeIcon key="half" icon={faStarHalfStroke} />);
        // We show other empty stars to have a total of 5 stars
      } else if (i > Math.ceil(starsRating)) {
        stars.push(<FontAwesomeIcon key={i} icon={farStar} />);
      }
    }
    return stars;
  }

  // TODO
  // Fonction d'ajout aux favoris
  // Fonction d'ajout au panier

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [favorite, setFavorite] = useState(recipe.favorite);

  const toggleFavorite = () => {
    setFavorite(!favorite);
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
        <CartIcon isLoggedIn={isLoggedIn} />
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
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
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
    favorite: true,
    picture: 'https://picsum.photos/200',
    title: 'Titre par défaut',
    rating: 3.5,
    time: '15 min',
    difficulty: 'Facile',
  }),
};

export default RecipeCard;
