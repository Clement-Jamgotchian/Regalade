import axios from 'axios';
import { useEffect, useState } from 'react';
import './RecipeDetails.scss';
import { useParams } from 'react-router-dom';
import { getStars } from '../../utils/formatRecipeData';

import cuisine from '../../assets/cuisine.png';
import cuisson from '../../assets/temps-de-cuisson.png';
import vegetables from '../../assets/vegetables.png';
import Header from '../Header/Header';
import Menuphone from '../Menuphone/Menuphone';
import Footer from '../Footer/Footer';

function RecipeDetails() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [cookingDuration, setCookingDuration] = useState('');
  const [picture, setPicture] = useState('');
  const [setupDuration, setSetupDuration] = useState('');
  const [step, setStep] = useState('');
  const [containsIngredients, setContainsIngrediants] = useState([]);
  const { id } = useParams();

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
