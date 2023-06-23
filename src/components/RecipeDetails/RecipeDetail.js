import { useEffect, useState } from 'react';
import './RecipeDetails.scss';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getDifficultyLabel, getStars } from '../../utils/formatRecipeData';

import cuisine from '../../assets/cuisine.png';
import cuisson from '../../assets/temps-de-cuisson.png';
import defaultPicture from '../../assets/pictureDefault.jpg';
import vegetables from '../../assets/vegetables.png';
import Header from '../Header/Header';
import Menuphone from '../Menuphone/Menuphone';
import Footer from '../Footer/Footer';
import FavoriteIcon from '../RecipeCard/Icons/FavoriteIcon/FavoriteIcon';
import { updateRecipesList } from '../../actions/list';
import AxiosPrivate from '../../utils/AxiosPrivate';
// eslint-disable-next-line import/no-named-as-default
import AxiosPublic from '../../utils/AxiosPublic';
import Rating from './Rating/Rating';
import CommentsCarousel from './CommentsCarousel/CommentsCarousel';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from '../Loader/Loader';

// If user is logged in, we show the cart icon
function CartIcon({ addToList, isFavorite }) {
  const location = useLocation();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
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

function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [containsIngredients, setContainsIngrediants] = useState([]);
  const { idRecette } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const [cartOn, setCartOn] = useState(false);
  const regex = /ÉTAPE/g;
  const steps = recipe.step?.replace(regex, '<br/><br/> ÉTAPE');

  const addToList = async (id) => {
    await AxiosPrivate.post(`/list/${id}`)
      .then(() => {
        dispatch(updateRecipesList({ action: 'added' }));
        setCartOn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleClick() {
    navigate('/recettes');
  }

  const getPicture = (value) => {
    if (value.picture === null) {
      return defaultPicture;
    }
    return `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/${value.picture}`;
  };

  useEffect(() => {
    AxiosPublic.get(`/recipes/${idRecette}`)
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
      {recipe.title ? (
        <>
          <section
            className="recipeDetails-header"
          >
            <div className="recipeDetails-header-imgAndButton">
              <LazyLoadImage
                className="recipeDetails-header-image"
                src={getPicture(recipe)}
                effect="blur"
              />
              <button type="button" className="recipeDetails-header-cancelButton" onClick={handleClick}>
                <p className="recipeDetails-header-cancelButton-image">&#10005;</p>
              </button>
              <CartIcon
                isLoggedIn={isLoggedIn}
                addToList={() => {
                  addToList(idRecette);
                }}
                isFavorite={cartOn}
              />
              <FavoriteIcon
                recipe={recipe}
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
                {containsIngredients.map((item) => (
                  <section key={item.ingredient.id} className="recipeDetails-ingredients-ingredient-item">
                    <img className="recipeDetails-ingredients-ingredient-item-image" src={vegetables} alt="icone de l'ingrédient" />
                    <div className="recipeDetails-ingredients-ingredient-item-container">
                      <p className="recipeDetails-ingredients-ingredient-item-name">{item.ingredient.name}</p>
                      <p className="recipeDetails-ingredients-ingredient-item-name-quantity">
                        {item.quantity}
                        {item.ingredient.unit}
                      </p>
                    </div>
                  </section>
                ))}

              </div>
            </section>
            <section className="recipeDetails-recette">
              <h2 className="recipeDetails-recette-titles">Recette</h2>
              <div
                className="recipeDetails-recette-step"
            // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: steps,
                }}
              />
            </section>
          </section>
          {isLoggedIn && (
          <section className="recipeDetails-comments">
            {recipe.comments
          && <CommentsCarousel comments={recipe.comments} />}
            <Rating recipe={idRecette} />
          </section>
          )}
        </>
      )
        : (<Loader />)}
      <Footer className="recipeDetails-layout" />
    </section>
  );
}

CartIcon.propTypes = {
  addToList: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default RecipeDetails;
