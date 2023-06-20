import axios from 'axios';
import { useState } from 'react';
import { Button, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../actions/list';
import './CreateRecipe.scss';
import StepOne from './Step/stepOne';
import StepTwo from './Step/stepTwo';

function CreateRecipe() {
  const [postImage, setPostImage] = useState({
    picture: '',
  });
  const [title, setTitle] = useState('');
  const [descritption, setDescritption] = useState('');
  const [step, setStep] = useState('');
  const [setupDuration, setSetupDuration] = useState('');
  const [cookingDuration, setCookingDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
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
        <Row className="mb-3 CreateRecipe-form-row-1">
          <FloatingLabel controlId="floatingSelect" label="Works with selects" className="CreateRecipe-form-row-1-group">
            <Form.Select aria-label="Floating label select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </FloatingLabel>
        </Row>
        <Button className="CreateRecipe-form-button" type="submit">Créer</Button>
      </Form>
    </section>
  );
}

export default CreateRecipe;
