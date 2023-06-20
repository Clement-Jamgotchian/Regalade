/* eslint-disable react/prop-types */
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function StepTwo({
  setupDuration,
  setSetupDuration,
  setDifficulty,
  cookingDuration,
  setCookingDuration,
  setContainsIngredients,
}) {
  return (
    <section className="CreateRecipe-2">
      <Row className="mb-3 CreateRecipe-form-row-2">
        <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="4">
          <Form.Label className="CreateRecipe-form-row-2-group-label">Titre</Form.Label>
          <Form.Control
            required
            className="CreateRecipe-form-row-2-group-input"
            type="text"
            name="title"
            id="title"
            placeholder="Titre de la recette"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-2">
        <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="6">
          <Form.Label className="CreateRecipe-form-row-2-group-label">
            La photo de la recette
          </Form.Label>
          <Form.Control
            className="CreateRecipe-form-row-2-group-input"
            type="file"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg"
          />
        </Form.Group>
      </Row>
      <div key="inline-radio" className="mb-3">
        <Form.Label className="CreateRecipe-form-row-2-group-label">
          Difficulté
        </Form.Label>
        <Form.Check
          inline
          value={1}
          label="facile"
          name="group1"
          type="radio"
          id="inline-radio-3"
        />
        <Form.Check
          inline
          value={2}
          label="moyen"
          name="group1"
          type="radio"
          id="inline-radio-1"
        />
        <Form.Check
          inline
          value={3}
          label="difficile"
          name="group1"
          type="radio"
          id="inline-radio-2"
        />
      </div>
      <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="6">
        <Form.Label>
          Temps de cuisson
          {' '}
          {setupDuration}
          {' '}
          min
        </Form.Label>
        <Form.Range
          onChange={(e) => {
            console.log(e.target.value);
            setSetupDuration((e.target.value) * 5);
          }}
        />
      </Form.Group>
      <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="6">
        <Form.Label>
          Temps de cuisson
          {' '}
          {cookingDuration}
          {' '}
          min
        </Form.Label>
        <Form.Range
          onChange={(e) => {
            console.log(e.target.value);
            setCookingDuration(((e.target.value) * 5));
          }}
        />
      </Form.Group>
      <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      <Link to="/recette/creation/2" className="CreateRecipe-form-button" type="button">Etape 2</Link>
    </section>
  );
}

export default StepTwo;
