/* eslint-disable no-plusplus */

// React components
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';

// Import Redux actions
import { Link } from 'react-router-dom';
import { changeAlertVariant, newAlertMessage, showOrHideAlert, updateRecipesList } from '../../actions/list';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../actions/favorites';

// Styles import
import './RecipeCard.scss';

// Import local utils
import {
  getStars,
  getTotalDuration,
  getDifficultyLabel,
} from '../../utils/formatRecipeData';

// Import local components
import ChangePortionsInput from './ChangePortionsInput/ChangePortionsInput';
import FavoriteIcon from './Icons/FavoriteIcon/FavoriteIcon';
import CartIcon from './Icons/CartIcon/CartIcon';
import DeleteIcon from './Icons/DeleteIcon/DeleteIcon';

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [favorite, setFavorite] = useState(false);

  const addToList = async (id) => {
    await axios
      .post(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${id}`,
      )
      .then(() => {
        dispatch(updateRecipesList({ action: 'added' }));
        dispatch(newAlertMessage('La recette a bien été ajoutée à votre liste de repas.'));
        dispatch(changeAlertVariant('success'));
        dispatch(showOrHideAlert(true));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      })
      .catch(() => {
        console.log('error');
        dispatch(changeAlertVariant('danger'));
        dispatch(newAlertMessage('Cette recette est déjà dans votre liste de repas.'));
        dispatch(showOrHideAlert(true));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      });
  };

  const removeFromList = async (id) => {
    await axios
      .delete(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${id}`,
      )
      .then(() => {
        dispatch(updateRecipesList({ action: 'removed' }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToFavorite = async (id) => {
    await axios
      .post(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/favorite/${id}`,
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteToFavorite = async (id) => {
    await axios
      .delete(
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/favorite/${id}`,
      )

      .catch((error) => {
        console.log(error);
      });
  };

  const toggleFavorite = (id) => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(removeRecipeFromFavorites(recipe));
      deleteToFavorite(id);
    } else {
      dispatch(addRecipeToFavorites(recipe));
      addToFavorite(id);
    }
  };

  return (
    <Card className="RecipeCard">
      <FavoriteIcon
        isLoggedIn={isLoggedIn}
        isFavorite={favorite}
        toggleFavorite={() => {
          toggleFavorite(recipe.id);
        }}
      />
      <DeleteIcon
        removeFromList={() => {
          removeFromList(recipe.id);
        }}
      />
      <Link className="RecipeCard--link" to={`/recette/${recipe.id}`}>
        <Card.Img
          className="RecipeCard--img"
          variant="top"
          src={recipe.picture}
        />
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
          <ChangePortionsInput
            recipeId={recipe.id}
            portions={recipe.userPortions}
          />
        </Card.Body>
      </Link>
    </Card>
  );
}

RecipeCard.propTypes = {
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
