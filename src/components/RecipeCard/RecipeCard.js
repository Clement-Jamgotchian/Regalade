/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faStarHalfStroke, faCartPlus, faChartSimple, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClock as farClock, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import './RecipeCard.scss';

function RecipeCard({
  favorite, picture, title, rating, time, difficulty,
}) {
  // Show fill stars depends on rating
  function getStars(starsRating) {
    const stars = [];
    // For each integer, we show a full star
    for (let i = 1; i <= 5; i++) {
      if (i <= starsRating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
      }
      // If rating is decimal, we show a half star
      if (/^[1-4]+.[1-9]+$/.test(starsRating) && Math.floor(starsRating) === i) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfStroke} />);
        // We show other empty stars to have a total of 5 stars
      } else if (i > Math.ceil(starsRating)) {
        stars.push(<FontAwesomeIcon key={i} icon={farStar} />);
      }
    }
    return stars;
  }

  return (
    <Card className="RecipeCard">
      {favorite
        ? <FontAwesomeIcon className="RecipeCard--favorite__active" icon={faHeart} />
        : <FontAwesomeIcon className="RecipeCard--favorite" icon={farHeart} />}
      <Card.Img className="RecipeCard--img" variant="top" src={picture} />
      <Card.Body className="RecipeCard--body">
        <FontAwesomeIcon className="RecipeCard--cart" icon={faCartPlus} />
        <Card.Title className="RecipeCard--title">{title}</Card.Title>
        <Card.Text className="RecipeCard--rating">
          {getStars(rating)}
        </Card.Text>
        <Card.Text className="RecipeCard--content">
          <FontAwesomeIcon icon={farClock} />
          {time}
          <span> / </span>
          <FontAwesomeIcon icon={faChartSimple} />
          {difficulty}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  favorite: PropTypes.bool.isRequired,
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default RecipeCard;
