import axios from 'axios';
import { useEffect, useState } from 'react';
import './RecipeDetails.scss';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCircleXmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../actions/favorites';
import { getDifficultyLabel, getStars } from '../../utils/formatRecipeData';

import cuisine from '../../assets/cuisine.png';
import cuisson from '../../assets/temps-de-cuisson.png';
import vegetables from '../../assets/vegetables.png';
import Header from '../Header/Header';
import Menuphone from '../Menuphone/Menuphone';
import Footer from '../Footer/Footer';
import { updateRecipesList } from '../../actions/list';

function FavoriteIcon({ isLoggedIn, isFavorite, toggleFavorite }) {
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';
  const className = isFavorite ? 'recipeDetails-favorite__active' : 'recipeDetails-favorite';
  const icon = isFavorite ? faHeart : farHeart;

  if (isLoggedIn && !isInPageList) {
    return (
      <button className="recipeDetails-buttonFavoriteToggle" type="button" onClick={toggleFavorite}>
        <FontAwesomeIcon className={className} icon={icon} />
      </button>
    );
  }
}

// If user is logged in, we show the cart icon
function CartIcon({ isLoggedIn, addToList, isFavorite }) {
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';
  const className = isFavorite ? 'recipeDetails-cart__active' : 'recipeDetails-cart';

  if (isLoggedIn && !isInPageList) {
    return (
      <button className="recipeDetails-cart" type="button" onClick={(e) => { e.preventDefault(); addToList(); }}>
        <FontAwesomeIcon className={className} icon={faCartPlus} />
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
      <button className="recipeDetails-deleteButton" type="button" onClick={removeFromList}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    );
  }
}

function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [containsIngredients, setContainsIngrediants] = useState([]);
  const { idRecette } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [favorite, setFavorite] = useState(false);
  const [cartOn, setCartOn] = useState(false);

  const addToList = async (id) => {
    await axios.post(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${id}`)
      .then(() => {
        dispatch(updateRecipesList({ action: 'added' }));
        setCartOn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromList = async (id) => {
    await axios.delete(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${id}`)
      .then(() => {
        dispatch(updateRecipesList({ action: 'removed' }));
        setCartOn(false);
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

  function handleClick() {
    navigate('/recettes');
  }

  useEffect(() => {
    axios.get(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes/${idRecette}`)
      .then((response) => {
        setContainsIngrediants(response.data.containsIngredients);
        setRecipe(response.data);
        console.log(response.data);
      })
      .catch(() => {
        console.log('erreur dans recette detaillé');
      });
  }, []);
  return (

    <section className="recipeDetails">
      <Header className="recipeDetails-layout" style={{ display: 'none' }} />
      <Menuphone className="recipeDetails-layout" />
      <section
        className="recipeDetails-header"
      >
        <div className="recipeDetails-header-imgAndButton">
          <img src={recipe.picture} alt="la recette" className="recipeDetails-header-image" />
          <button type="button" className="recipeDetails-header-cancelButton" onClick={handleClick}>
            <p className="recipeDetails-header-cancelButton-image">&#10005;</p>
          </button>
          <CartIcon
            isLoggedIn={isLoggedIn}
            addToList={() => {
              addToList(recipe.id);
            }}
            isFavorite={cartOn}
          />
          <DeleteIcon removeFromList={() => {
            removeFromList(recipe.id);
          }}
          />
          <FavoriteIcon
            isLoggedIn={isLoggedIn}
            isFavorite={favorite}
            toggleFavorite={toggleFavorite}
          />
        </div>
        <div className="recipeDetails-header-container">
          <h1 className="recipeDetails-header-title">{recipe.title}</h1>
          <div className="recipeDetails-header-rating">{getStars(recipe.rating)}</div>
          <p>
            Niveau :
            {' '}
            {getDifficultyLabel(recipe.difficulty)}
          </p>

          <section className="recipeDetails-preparation">
            <div className="recipeDetails-preparation-time">
              <img src={cuisine} alt="icone de preparation" className="recipeDetails-preparation-image" />
              <h3 className="recipeDetails-preparation-title">
                Préparation
                {' '}
                <span className="recipeDetails-preparation-title-quantity">
                  {recipe.cookingDuration}
                  {' '}
                  min
                </span>
              </h3>
            </div>
            <div className="recipeDetails-preparation-cuisson">
              <img src={cuisson} alt="icone de cuisson" className="recipeDetails-preparation-image" />
              <h3 className="recipeDetails-preparation-title">
                Cuisson
                {' '}
                <span className="recipeDetails-preparation-title-quantity">
                  {recipe.setupDuration}
                  {' '}
                  min
                </span>

              </h3>
            </div>
          </section>
        </div>
      </section>

      <section className="recipeDetails-ingredients-container">
        <section className="recipeDetails-ingredients">
          <h2 className="recipeDetails-ingredients-titles">
            Ingredients pour
            {' '}
            {recipe.portions}
            {' '}
            personnes
          </h2>
          <div className="recipeDetails-ingredients-ingredient">
            {containsIngredients.map((ingredient) => (
              <section key={ingredient.ingredient.id} className="recipeDetails-ingredients-ingredient-item">
                <img className="recipeDetails-ingredients-ingredient-item-image" src={vegetables} alt="icone de l'ingrédient" />
                <div className="recipeDetails-ingredients-ingredient-item-container">
                  <p className="recipeDetails-ingredients-ingredient-item-name">{ingredient.ingredient.name}</p>
                  <p className="recipeDetails-ingredients-ingredient-item-name-quantity">
                    {ingredient.quantity}
                    {ingredient.ingredient.unit}
                  </p>
                </div>
              </section>
            ))}

          </div>
        </section>
        <section className="recipeDetails-recette">
          <h2 className="recipeDetails-recette-titles">Recette</h2>
          <div className="recipeDetails-recette-step">{recipe.step}</div>
        </section>
      </section>
      <Footer className="recipeDetails-layout" />
    </section>
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
  isFavorite: PropTypes.bool.isRequired,
};

DeleteIcon.propTypes = {
  removeFromList: PropTypes.func.isRequired,
};

export default RecipeDetails;
