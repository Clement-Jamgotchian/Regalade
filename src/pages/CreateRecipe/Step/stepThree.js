/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import AxiosPrivate from '../../../utils/AxiosPrivate';

import vegetables from '../../../assets/vegetables.png';

function StepThree({
  containsIngredients,
  setContainsIngredients,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  setDisplayFour,
  displayThree,
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
        className="CreateRecipe-form-row-2-container-ingredients"
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

  const deleteIngredient = (id) => {
    allIngredient.splice(id - 1, 1);
    containsIngredients.splice(id - 1, 1);
  };

  const ingredientList = () => (
    allIngredient.map((ingredient) => {
      // eslint-disable-next-line no-param-reassign
      ingredient.number = allIngredient.indexOf(ingredient) + 1;
      return (
        <div key={ingredient.id} className="CreateRecipe-form-row-3-card">
          <img src={vegetables} alt="logo ingredient" className="CreateRecipe-form-row-3-card-img" />
          <div className="CreateRecipe-form-row-3-card-text">
            <p className="CreateRecipe-form-row-3-card-text-name">{ingredient.name}</p>
            <p className="CreateRecipe-form-row-3-card-text-quantity">{ingredient.quantity}</p>
            <p className="CreateRecipe-form-row-3-card-text-unit">{ingredient.unit}</p>
          </div>
          <Button
            className="CreateRecipe-form-row-3-card-text-delete"
            type="button"
            onClick={() => {
              deleteIngredient(ingredient.number);
              setAllIngredient([...allIngredient]);
            }}
          />
        </div>
      );
    })
  );

  const addIngredient = () => {
    const newIngredient = {
      quantity,
      ingredients: ingredientId,
    };

    const newIngredientlocal = {
      quantity,
      name: ingredientName,
      unit,
      id: ingredientId,
      number: allIngredient.length + 1,
    };

    setContainsIngredients([...containsIngredients, newIngredient]);
    setAllIngredient([...allIngredient, newIngredientlocal]);
  };

  function viewTwo() {
    setDisplayOne('none'); setDisplayTwo(''); setDisplayThree('none'); setDisplayFour('none');
  }

  function viewFour() {
    setDisplayOne('none'); setDisplayTwo('none'); setDisplayThree('none'); setDisplayFour('');
  }

  useEffect(() => {
    searchIngredient();
  }, [search]);
  return (
    <section className="CreateRecipe-3" style={{ display: `${displayThree}` }}>
      <Button className="CreateRecipe-1-button" onClick={() => { viewTwo(); }}>&#x2190;</Button>
      <h2 className="CreateRecipe-1-title">
        Etape 3
      </h2>

      <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="3">
        <Form.Label className="CreateRecipe-form-row-2-group-label">Trouver un ingrédient</Form.Label>
        <Form.Control
          aria-label="ingrédient"
          className="CreateRecipe-form-row-2-group-input"
          type="search"
          name="search"
          id="search"
          placeholder="Rechercher"
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
        />
      </Form.Group>
      <Form.Group className="CreateRecipe-form-row-2-container" as={Col} md="3">
        {searchIngredientView()}
      </Form.Group>
      <Row className="mb-3 CreateRecipe-form-row-3">
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
      <Row className="mb-3 CreateRecipe-form-row-3-ingredient">
        <InputGroup className="CreateRecipe-form-row-3-text">
          <InputGroup.Text>{ingredientName}</InputGroup.Text>
          <InputGroup.Text>{quantity}</InputGroup.Text>
          <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup>
      </Row>
      <Button className="CreateRecipe-form-button" type="button" onClick={addIngredient}>&#x2B; Ajouter l&apos;ingredient</Button>
      <Row className="mb-3 CreateRecipe-form-row-3-card-container">
        {ingredientList()}
      </Row>

      <Button className="CreateRecipe-button" type="button" onClick={() => { viewFour(); }}>Etape 4</Button>

    </section>
  );
}

export default StepThree;