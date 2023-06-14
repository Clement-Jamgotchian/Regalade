import axios from 'axios';
import { useEffect, useState } from 'react';
import './RecipeDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../../actions/favorites';
import { getStars } from '../../utils/formatRecipeData';

import cuisine from '../../assets/cuisine.png';
import cuisson from '../../assets/temps-de-cuisson.png';
import vegetables from '../../assets/vegetables.png';
import Header from '../Header/Header';
import Menuphone from '../Menuphone/Menuphone';
import Footer from '../Footer/Footer';
// import { addRecipeToList } from '../../actions/list';

function FavoriteIcon(isLoggedIn, isFavorite, toggleFavorite) {
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

function CartIcon(isLoggedIn, addToList) {
  if (isLoggedIn) {
    return (
      <button className="RecipeCard--buttonFavoriteToggle" type="button" onClick={addToList}>
        <FontAwesomeIcon className="RecipeCard--cart" icon={faCartPlus} />
      </button>
    );
  }
}

function RecipeDetails() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [cookingDuration, setCookingDuration] = useState('');
  const [picture, setPicture] = useState('');
  const [setupDuration, setSetupDuration] = useState('');
  const [step, setStep] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [containsIngredients, setContainsIngrediants] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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

  function handleClick() {
    navigate('/home');
  }

  useEffect(() => {
    axios.get(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContainsIngrediants(response.data.containsIngredients);
        setSetupDuration(response.data.setupDuration);
        setCookingDuration(response.data.cookingDuration);
        setPicture(response.data.picture);
        setStep(response.data.step);
        setRating(response.data.rating);
        setRecipe(response.data);
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
        <img src={picture} alt="la recette" className="recipeDetails-header-image" />
        <button type="button" className="recipeDetails-header-cancelButton" onClick={handleClick}>
          <p className="recipeDetails-header-cancelButton-image">&#10005;</p>
        </button>
        <CartIcon
          className="recipeDetails-header-cart"
          isLoggedIn={isLoggedIn}
          // addToList={() => dispatch(addRecipeToList(recipe))}
        />
        <FavoriteIcon
          className="recipeDetails-header-favorite"
          isLoggedIn={isLoggedIn}
          isFavorite={favorite}
          toggleFavorite={toggleFavorite}
        />
        <div className="recipeDetails-header-container">
          <h1 className="recipeDetails-header-title">{title}</h1>
          <div className="recipeDetails-header-rating">{getStars(rating)}</div>
          <section className="recipeDetails-preparation">
            <div className="recipeDetails-preparation-time">
              <img src={cuisine} alt="icone de preparation" className="recipeDetails-preparation-image" />
              <h3 className="recipeDetails-preparation-title">
                Préparation
                {' '}
                <span className="recipeDetails-preparation-title-quantity">
                  {cookingDuration}
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
                  {setupDuration}
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
          <h2 className="recipeDetails-ingredients-titles">Ingredients pour X personnes</h2>
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
          <div className="recipeDetails-recette-step">{step}</div>
        </section>
      </section>
      <Footer className="recipeDetails-layout" />
    </section>
  );
}

export default RecipeDetails;
