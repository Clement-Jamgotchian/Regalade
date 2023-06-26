// React components
import { useLocation } from 'react-router-dom';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// Styles import
import './InfoIcon.scss';

// Bootstrap components
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function InfoIcon({ recipe }) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const location = useLocation();
  const isInPageFridge = location.pathname === '/profil/mes-ingredients';

  const recipes = useSelector((state) => state.fridge.listSuggested
    .map((sugRecipes) => sugRecipes));

  const currentRecipe = recipes && recipes.find((recipess) => recipess.recipe.id === recipe.id);

  const titleTobuy = currentRecipe && currentRecipe.ingredientsToBuy.length > 0 ? 'Il vous manque' : 'Vous avez tout !';
  const titleToComplete = currentRecipe && currentRecipe.ingredientsToComplete.length > 0 ? 'A completer' : '';

  const percent = currentRecipe && currentRecipe.percent;

  const now = Math.round(percent);

  if (isLoggedIn && isInPageFridge) {
    return (
      <div>
        <OverlayTrigger
          bg="primary"
          placement="right-end"
          overlay={(
            <Tooltip id="tooltip-left">
              <ListGroup variant="flush" className="Info-list">
                <ListGroup.Item className="fw-bold Info-titles">{titleTobuy}</ListGroup.Item>
                {currentRecipe && currentRecipe.ingredientsToBuy.map((ingredients) => (
                  <ListGroup.Item key={ingredients.ingredient.name} className="Info-text">
                    <p>{ingredients.ingredient.name}</p>
                    <p>{ingredients.quantity}</p>
                    <p>{ingredients.ingredient.unit}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="fw-bold Info-titles">{titleToComplete}</ListGroup.Item>
                {currentRecipe && currentRecipe.ingredientsToComplete.map((ingredients) => (
                  <ListGroup.Item key={ingredients.ingredient.name} className="Info-text">
                    <p>{ingredients.ingredient.name}</p>
                    <p>{ingredients.quantity}</p>
                    <p>{ingredients.ingredient.unit}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tooltip>
          )}
        >
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="xl"
            className="Info-icon"
          />
        </OverlayTrigger>
        <ProgressBar now={now} label={`${now}%`} variant="primary" />
      </div>
    );
  }
}

InfoIcon.propTypes = {
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

export default InfoIcon;
