import React, { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../actions/list';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Menuphone from '../../components/Menuphone/Menuphone';
import AxiosPrivate from '../../utils/AxiosPrivate';
import './EditRecipe.scss';
import StepFourEdit from './step/stepFourEdit';
import StepOneEdit from './step/stepOneEdit';
import StepThreeEdit from './step/stepThreeEdit';
import StepTwoEdit from './step/stepTwoEdit';

function EditRecipe() {
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
  const [loading, setLoading] = useState('false');
  const recipeToEdit = useSelector((state) => state.recipe.recipe);

  const [confirmed, setConfirmed] = useState(false);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);

  const [displayOne, setDisplayOne] = useState('');
  const [displayTwo, setDisplayTwo] = useState('none');
  const [displayThree, setDisplayThree] = useState('none');
  const [displayFour, setDisplayFour] = useState('none');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profil/mes-recettes');
  };

  console.log(recipeToEdit);

  const defaultValueRecipe = () => {
    if (recipeToEdit.category.title === 'Plat') {
      return 2;
    }
    if (recipeToEdit.category.title === 'Entrée') {
      return 1;
    }
    return 3;
  };

  const ingredientToEdit = () => {
    // eslint-disable-next-line array-callback-return
    recipeToEdit.containsIngredients.map((ingredient) => {
      const newIngredient = {
        quantity: parseInt(ingredient.quantity),
        ingredient: ingredient.ingredient.id,
      };

      setContainsIngredients([...containsIngredients, newIngredient]);
    });
  };

  const setRecipeToEdit = () => {
    setTitle(recipeToEdit.title);
    setPostImage({ picture: recipeToEdit.picture });
    setDescritption(recipeToEdit.description);
    setStep(recipeToEdit.step);
    setSetupDuration(recipeToEdit.setupDuration);
    setCookingDuration(recipeToEdit.cookingDuration);
    setDifficulty(recipeToEdit.difficulty);
    setCategory(defaultValueRecipe());
    setPortions(recipeToEdit.portions);
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
      setLoading('true');
      await AxiosPrivate.put(`/recipes/${recipeToEdit.id}`, {
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
          setLoading(false);
          navigate('/profil/mes-recettes');
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

  useEffect(() => {
    setRecipeToEdit();
    ingredientToEdit();
  }, []);

  return (
    <section className="CreateRecipe">
      <Header className="CreateRecipe-layout" style={{ display: 'none' }} />
      <Menuphone className="CreateRecipe-layout" />
      <button type="button" className="CreateRecipe-cancelButton" onClick={handleClick}>
        <p className="recipeDetails-header-cancelButton-image">&#10005;</p>
      </button>
      <h1 className="CreateRecipe-title">Modifier une recette</h1>
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
        <StepOneEdit
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
          recipeToEdit={recipeToEdit}
        />
        <StepTwoEdit
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
          recipeToEdit={recipeToEdit}
        />
        <StepThreeEdit
          containsIngredients={containsIngredients}
          setContainsIngredients={setContainsIngredients}
          setDisplayOne={setDisplayOne}
          setDisplayTwo={setDisplayTwo}
          setDisplayThree={setDisplayThree}
          setDisplayFour={setDisplayFour}
          displayThree={displayThree}
          recipeToEdit={recipeToEdit}
        />
        <StepFourEdit
          step={step}
          setStep={setStep}
          setConfirmed={setConfirmed}
          setDisplayOne={setDisplayOne}
          setDisplayTwo={setDisplayTwo}
          setDisplayThree={setDisplayThree}
          setDisplayFour={setDisplayFour}
          displayFour={displayFour}
          loading={loading}
          setLoading={setLoading}
          recipeToEdit={recipeToEdit}
        />
      </Form>
      <Footer className="CreateRecipe-layout" />
    </section>
  );
}

export default EditRecipe;
