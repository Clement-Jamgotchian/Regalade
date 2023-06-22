import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../actions/list';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Menuphone from '../../components/Menuphone/Menuphone';
import './CreateRecipe.scss';
import StepFour from './Step/stepFour';
import StepOne from './Step/stepOne';
import StepThree from './Step/stepThree';
import StepTwo from './Step/stepTwo';

function CreateRecipe() {
  const [postImage, setPostImage] = useState({
    picture: '',
  });
  const [title, setTitle] = useState('');
  const [descritption, setDescritption] = useState('');
  const [step, setStep] = useState('');
  const [setupDuration, setSetupDuration] = useState(0);
  const [cookingDuration, setCookingDuration] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [category, setCategory] = useState(1);
  const [portions, setPortions] = useState(1);
  const [containsIngredients, setContainsIngredients] = useState([]);

  const [confirmed, setConfirmed] = useState(false);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);

  const [displayOne, setDisplayOne] = useState('none');
  const [displayTwo, setDisplayTwo] = useState('');
  const [displayThree, setDisplayThree] = useState('none');
  const [displayFour, setDisplayFour] = useState('none');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profil/mes-recettes');
  };

  console.log(
    title,
    postImage.picture,
    cookingDuration,
    setupDuration,
    step,
    difficulty,
    category,
    containsIngredients,
    portions,
  );

  const handleSubmit = async () => {
    if (confirmed === true) {
      await axios.post('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/recipes', {
        title,
        descritption,
        picture: postImage.picture,
        cookingDuration,
        setupDuration,
        step,
        difficulty,
        category,
        containsIngredients,
        portions,
      })
        .then(() => {
          dispatch(newAlertMessage('modifications bien ajoutées'));
          dispatch(showOrHideAlert(true));
          dispatch(changeAlertVariant('success'));
          setTimeout(() => {
            dispatch(showOrHideAlert(false));
          }, '5000');
        })
        .catch((err) => {
          console.log(err);
          dispatch(newAlertMessage("Les modifications n'ont pas pu etre ajoutées"));
          dispatch(showOrHideAlert(true));
          dispatch(changeAlertVariant('danger'));
          setTimeout(() => {
            dispatch(showOrHideAlert(false));
          }, '5000');
        });
    } else {
      dispatch(newAlertMessage("Tu n'as pas confirmé les étapes, n'oublie pas de te relire pour éviter d'oublier ton ingrédient secret"));
      dispatch(showOrHideAlert(true));
      dispatch(changeAlertVariant('danger'));
      setTimeout(() => {
        dispatch(showOrHideAlert(false));
      }, '5000');
    }
  };

  return (
    <section className="CreateRecipe">
      <Header className="CreateRecipe-layout" style={{ display: 'none' }} />
      <Menuphone className="CreateRecipe-layout" />
      <button type="button" className="recipeDetails-header-cancelButton" onClick={handleClick}>
        <p className="recipeDetails-header-cancelButton-image">&#10005;</p>
      </button>
      <h1 className="CreateRecipe-title">Créer une recette</h1>
      <Form className="CreateRecipe-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => dispatch(showOrHideAlert(false))}
          dismissible
        >
          {alertMessage}
        </Alert>
        )}
        <StepOne
          postImage={postImage}
          setPostImage={setPostImage}
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          setDescritption={setDescritption}
          setPortions={setPortions}
          portions={portions}
          setDisplayOne={setDisplayOne}
          setDisplayTwo={setDisplayTwo}
          setDisplayThree={setDisplayThree}
          setDisplayFour={setDisplayFour}
          displayOne={displayOne}
        />
        <StepTwo
          setupDuration={setupDuration}
          setSetupDuration={setSetupDuration}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          cookingDuration={cookingDuration}
          setCookingDuration={setCookingDuration}
          containsIngredients={containsIngredients}
          setContainsIngredients={setContainsIngredients}
          setDisplayOne={setDisplayOne}
          setDisplayTwo={setDisplayTwo}
          setDisplayThree={setDisplayThree}
          setDisplayFour={setDisplayFour}
          displayTwo={displayTwo}
        />
        <StepThree
          containsIngredients={containsIngredients}
          setContainsIngredients={setContainsIngredients}
          setDisplayOne={setDisplayOne}
          setDisplayTwo={setDisplayTwo}
          setDisplayThree={setDisplayThree}
          setDisplayFour={setDisplayFour}
          displayThree={displayThree}
        />
        <StepFour
          step={step}
          setStep={setStep}
          setConfirmed={setConfirmed}
          setDisplayOne={setDisplayOne}
          setDisplayTwo={setDisplayTwo}
          setDisplayThree={setDisplayThree}
          setDisplayFour={setDisplayFour}
          displayFour={displayFour}
        />
      </Form>
      <Footer className="CreateRecipe-layout" />
    </section>
  );
}

export default CreateRecipe;
