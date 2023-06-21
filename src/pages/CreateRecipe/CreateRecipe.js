import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../actions/list';
import './CreateRecipe.scss';
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

  const dispatch = useDispatch();

  const handleSubmit = async () => {
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
  };

  return (
    <section className="CreateRecipe">
      <h1 className="CreateRecipe-title">Créer une recette</h1>
      <Form className="CreateRecipe-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <StepOne
          postImage={postImage}
          setPostImage={setPostImage}
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          setDescritption={setDescritption}
          setPortions={setPortions}
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
        />
        <StepThree
          step={step}
          setStep={setStep}
        />
        <Button className="CreateRecipe-form-button" type="submit">Créer</Button>
      </Form>
    </section>
  );
}

export default CreateRecipe;
