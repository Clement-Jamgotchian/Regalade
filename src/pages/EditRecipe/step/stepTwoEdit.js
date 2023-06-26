/* eslint-disable react/prop-types */
import { Button, Col, Form, InputGroup } from 'react-bootstrap';

import easy from '../../../assets/easy.png';
import moyen from '../../../assets/moyen.png';
import hard from '../../../assets/hard.png';

function StepTwoEdit({
  setupDuration,
  setSetupDuration,
  setDifficulty,
  cookingDuration,
  setCookingDuration,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  setDisplayFour,
  displayTwo,
  recipeToEdit,
}) {
  function viewOne() {
    setDisplayOne(''); setDisplayTwo('none'); setDisplayThree('none'); setDisplayFour('none');
  }

  function viewThree() {
    setDisplayOne('none'); setDisplayTwo('none'); setDisplayThree(''); setDisplayFour('none');
  }

  return (
    <section className="CreateRecipe-2" style={{ display: `${displayTwo}` }}>
      <Button className="CreateRecipe-1-button" onClick={() => { viewOne(); }}>&#x2190;</Button>
      <h2 className="CreateRecipe-1-title">
        Etape 2
      </h2>
      <Form.Group
        key="inline-radio-two"
        className="mb-3 CreateRecipe-form-row-2-group"
        onChange={(event) => {
          setDifficulty(parseInt(event.target.value, 10));
        }}
      >
        <Form.Label className="CreateRecipe-form-row-1-group-label">
          Difficulté
        </Form.Label>
        <section className="CreateRecipe-form-row-1-group-check">
          <div>
            <img src={easy} alt="vitesse lente" />
            <Form.Check
              inline
              value={1}
              label="facile"
              name="group2"
              type="radio"
              id="inline-radio-4"
            />
          </div>
          <div>
            <img src={moyen} alt="une entrée" />
            <Form.Check
              inline
              value={2}
              label="moyen"
              name="group2"
              type="radio"
              id="inline-radio-6"
            />
          </div>
          <div>
            <img src={hard} alt="une entrée" />
            <Form.Check
              inline
              value={3}
              label="difficile"
              name="group2"
              type="radio"
              id="inline-radio-5"
            />
          </div>
        </section>
      </Form.Group>
      <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="6">
        <Form.Label>
          Temps de préparation
        </Form.Label>
        <Form.Range
          className="CreateRecipe-form-row-1-group-range"
          defaultValue={recipeToEdit.setupDuration}
          min={0}
          max={40}
          onChange={(e) => {
            setSetupDuration((e.target.value) * 5);
          }}
        />
        <InputGroup.Text className="CreateRecipe-form-row-2-text">
          {setupDuration}
          {' '}
          min
        </InputGroup.Text>
      </Form.Group>
      <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="4">
        <Form.Label>
          Temps de cuisson
        </Form.Label>
        <Form.Range
          className="CreateRecipe-form-row-1-group-range"
          defaultValue={recipeToEdit.cookingDuration}
          min={0}
          max={50}
          onChange={(e) => {
            setCookingDuration(((e.target.value) * 5));
          }}
        />
        <InputGroup.Text className="CreateRecipe-form-row-2-text">
          {cookingDuration}
          {' '}
          min
        </InputGroup.Text>
      </Form.Group>
      <Button className="CreateRecipe-button" type="button" onClick={() => { viewThree(); }}>Etape 3</Button>
    </section>
  );
}

export default StepTwoEdit;
