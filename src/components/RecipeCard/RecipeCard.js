/* eslint-disable no-plusplus */

// React components
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card, Form, InputGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus, faChartSimple, faHeart, faCircleXmark, faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Import Redux actions
import { Link, useLocation } from 'react-router-dom';
import { updateRecipesList } from '../../actions/list';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../actions/favorites';

// Styles import
import './RecipeCard.scss';

// Import local utils
import { getStars, getTotalDuration, getDifficultyLabel } from '../../utils/formatRecipeData';

// If user is logged in, we show the favorite icon,
// active or not depends if added on favorite list or not
// faHeart : filled heart
// farHeart : empty heart
function FavoriteIcon({ isLoggedIn, isFavorite, toggleFavorite }) {
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';
  const className = isFavorite ? 'RecipeCard--favorite__active' : 'RecipeCard--favorite';
  const icon = isFavorite ? faHeart : farHeart;

  if (isLoggedIn && !isInPageList) {
    return (
      <button className="RecipeCard--buttonFavoriteToggle" type="button" onClick={toggleFavorite}>
        <FontAwesomeIcon className={className} icon={icon} />
      </button>
    );
  }
}

// If user is logged in, we show the cart icon
function CartIcon({ isLoggedIn, addToList }) {
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

function ChangePortionsInput({ portions }) {
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';

  if (isInPageList) {
    return (
      <InputGroup className="RecipeCard--portionsInput mb-3">
        <Button variant="info" id="button-addon1">
          -
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          value={portions}
        />
        <FontAwesomeIcon icon={faPerson} />
        <Button variant="info" id="button-addon1">
          +
        </Button>
      </InputGroup>
    );
  }
}

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [favorite, setFavorite] = useState(false);

  const addToList = async (id) => {
    await axios.post(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${id}`)
      .then(() => {
        dispatch(updateRecipesList({ action: 'added' }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromList = async (id) => {
    await axios.delete(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${id}`)
      .then(() => {
        dispatch(updateRecipesList({ action: 'removed' }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <DeleteIcon removeFromList={() => {
        removeFromList(recipe.id);
      }}
      />
      <Link className="RecipeCard--link" to={`/recette/${recipe.id}`}>
        <Card.Img className="RecipeCard--img" variant="top" src={recipe.picture} />
        <Card.Body className="RecipeCard--body">
          <CartIcon
            isLoggedIn={isLoggedIn}
            addToList={() => {
              addToList(recipe.id);
            }}
          />
          <Card.Title className="RecipeCard--title">{recipe.title}</Card.Title>
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
          <ChangePortionsInput portions={recipe.portions} />
        </Card.Body>
      </Link>
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

DeleteIcon.propTypes = {
  removeFromList: PropTypes.func.isRequired,
};

ChangePortionsInput.propTypes = {
  portions: PropTypes.number.isRequired,
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
    portions: PropTypes.number.isRequired,
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
