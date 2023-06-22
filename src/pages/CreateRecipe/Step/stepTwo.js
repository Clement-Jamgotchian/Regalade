/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import AxiosPrivate from '../../../utils/AxiosPrivate';

import vegetables from '../../../assets/vegetables.png';

function StepTwo({
  setupDuration,
  setSetupDuration,
  setDifficulty,
  cookingDuration,
  setCookingDuration,
  containsIngredients,
  setContainsIngredients,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  displayTwo,
}) {
  const [search, setSearch] = useState('');
  const [resultIngredients, setResultIngredients] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientId, setIngredientId] = useState();
  const [unit, setUnit] = useState('');
  const [allIngredient, setAllIngredient] = useState([]);

  const searchIngredient = async () => {
    await AxiosPrivate
      .get(
        `/ingredients/?search=${search}`,
      )
      .then((response) => {
        setResultIngredients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchIngredientView = () => {
    if (resultIngredients.length === 0) {
      return (
        '0 ingrédient trouvé'
      );
    }
    return (resultIngredients.map((ingredient) => (
      <Button
        className="CreateRecipe-button-ingredients"
        key={ingredient.id}
        type="button"
        onClick={() => {
          setIngredientName(ingredient.name);
          setIngredientId(ingredient.id);
          setUnit(ingredient.unit);
        }}
      >
        {ingredient.name}
      </Button>
    )));
  };

  const addIngredient = () => {
    const newIngredient = {
      quantity,
      ingredients: ingredientId,
    };

    const newIngredientlocal = {
      quantity,
      ingredients: ingredientName,
      unit,
      id: ingredientId,
    };

    setContainsIngredients([...containsIngredients, newIngredient]);
    setAllIngredient([...allIngredient, newIngredientlocal]);
  };

  function viewOne() {
    setDisplayOne(''); setDisplayTwo('none'); setDisplayThree('none');
  }

  function viewThree() {
    setDisplayOne('none'); setDisplayTwo('none'); setDisplayThree('');
  }

  useEffect(() => {
    searchIngredient();
  }, [search]);
  return (
    <section className="CreateRecipe-2" style={{ display: `${displayTwo}` }}>
      <Button onClick={() => { viewOne(); }}>&#x2190;</Button>
      <h2>
        Etape 2
      </h2>
      <div
        key="inline-radio-two"
        className="mb-3"
        onChange={(event) => {
          setDifficulty(event.target.value);
        }}
      >
        <Form.Label className="CreateRecipe-form-row-2-group-label">
          Difficulté
        </Form.Label>
        <Form.Check
          inline
          value={1}
          label="facile"
          name="group2"
          type="radio"
          id="inline-radio-4"
        />
        <Form.Check
          inline
          value={2}
          label="moyen"
          name="group2"
          type="radio"
          id="inline-radio-6"
        />
        <Form.Check
          inline
          value={3}
          label="difficile"
          name="group2"
          type="radio"
          id="inline-radio-5"
        />
      </div>
      <InputGroup className="CreateRecipe-form-row-2-group" as={Col} md="6">
        <Form.Label>
          Temps de préparation
        </Form.Label>
        <Form.Range
          min={0}
          max={40}
          onChange={(e) => {
            setSetupDuration((e.target.value) * 5);
          }}
        />
        <InputGroup.Text>
          {setupDuration}
          {' '}
          min
        </InputGroup.Text>
      </InputGroup>
      <InputGroup className="CreateRecipe-form-row-2-group" as={Col} md="4">
        <Form.Label>
          Temps de cuisson
        </Form.Label>
        <Form.Range
          min={0}
          max={50}
          onChange={(e) => {
            setCookingDuration(((e.target.value) * 5));
          }}
        />
        <InputGroup.Text>
          {cookingDuration}
          {' '}
          min
        </InputGroup.Text>
      </InputGroup>

      <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="3">
        <Form.Label className="CreateRecipe-form-row-2-group-label">Trouver un ingrédient</Form.Label>
        <Form.Control
          aria-label="ingrédient"
          required
          className="CreateRecipe-form-row-2-group-input"
          type="search"
          name="search"
          id="search"
          placeholder="Chercher"
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
        />
      </Form.Group>
      {searchIngredientView()}
      <Row className="mb-3 CreateRecipe-form-row-2">
        <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="3">
          <Form.Label className="CreateRecipe-form-row-2-group-label">Quantité</Form.Label>
          <Form.Control
            required
            className="CreateRecipe-form-row-2-group-input"
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantité de l'ingrédient"
            min={0}
            max={1000}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-2">
        <InputGroup>
          <InputGroup.Text>{ingredientName}</InputGroup.Text>
          <InputGroup.Text>{quantity}</InputGroup.Text>
          <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup>
      </Row>
      <Button className="CreateRecipe-form-button" type="button" onClick={addIngredient}>Ajouter</Button>
      <Row className="mb-3 CreateRecipe-form-row-2">
        {allIngredient.map((ingredient) => (
          <div key={ingredient.id} className="CreateRecipe-form-row-2-card">
            <img src={vegetables} alt="logo ingredient" />
            <p>{ingredient.name}</p>
            <p>{ingredient.quantity}</p>
            <p>{ingredient.unit}</p>
          </div>
        ))}
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-2">
        <Button className="CreateRecipe-form-button" type="button" onClick={() => { viewThree(); }}>Etape 3</Button>
      </Row>
    </section>
  );
}

export default StepTwo;
