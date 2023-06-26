/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import AxiosPrivate from '../../../utils/AxiosPrivate';

import vegetables from '../../../assets/vegetables.png';
import ModalIngredient from './ModalIngredient';

function StepThreeEdit({
  containsIngredients,
  setContainsIngredients,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  setDisplayFour,
  displayThree,
  recipeToEdit,
}) {
  const [search, setSearch] = useState('');
  const [resultIngredients, setResultIngredients] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientId, setIngredientId] = useState();
  const [unit, setUnit] = useState('');
  const [allIngredient, setAllIngredient] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const ingredientToEdit = () => {
    // eslint-disable-next-line array-callback-return
    recipeToEdit.containsIngredients.map((ingredient) => {
      const newIngredientlocal = {
        quantity: parseInt(ingredient.quantity),
        name: ingredient.ingredient.name,
        unit: ingredient.ingredient.unit,
        id: ingredient.ingredient.id,
        number: allIngredient.length + 1,
        key: ingredient.ingredient.id,
      };

      setAllIngredient([...allIngredient, newIngredientlocal]);
    });
  };

  const addIngredient = () => {
    const newIngredient = {
      quantity: parseInt(quantity),
      ingredient: ingredientId,
    };

    const newIngredientlocal = {
      quantity: parseInt(quantity),
      name: ingredientName,
      unit,
      id: ingredientId,
      number: allIngredient.length + 1,
    };

    setContainsIngredients([...containsIngredients, newIngredient]);
    setAllIngredient([...allIngredient, newIngredientlocal]);
  };

  const renderIngredient = () => {
    const findInList = containsIngredients.length > 0
      ? containsIngredients.find((ingredient) => ingredient.ingredient === ingredientId) : null;
    if (findInList) {
      return (
        <Alert bg="alert">
          Ingrédient déjà dans le frigo !
        </Alert>
      );
    }
    return <Button className="CreateRecipe-form-button" type="button" onClick={addIngredient}>&#x2B; Ajouter l&apos;ingredient</Button>;
  };

  const updateQuantity = (newQuantity, ingredientNumber) => {
    const updatedData = allIngredient.map((item) => {
      if (item.id === ingredientNumber) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setAllIngredient(updatedData);
  };

  useEffect(() => {
    ingredientToEdit();
  }, []);

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
            <input
              className="FridgeDetails-input"
              id={ingredient.id}
              value={ingredient.quantity}
              onChange={(event) => {
                updateQuantity(
                  event.currentTarget.value,
                  ingredient.id,
                );
              }}
              type="number"
            />
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
      <Button variant="outline-primary" className="CreateRecipe-form-row-2-group-buttonNewIngredient" onClick={handleShow}>
        L&apos;ingrédient n&apos;existe pas ?
      </Button>
      <Row className="mb-3 CreateRecipe-form-row-3">
        <Form.Group className="CreateRecipe-form-row-2-group" as={Col} md="3">
          <Form.Label className="CreateRecipe-form-row-2-group-label">Quantité</Form.Label>
          <Form.Control
            className="CreateRecipe-form-row-2-group-input"
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantité de l'ingrédient"
            min={0}
            max={1000}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-3-ingredient">
        <Form.Label className="CreateRecipe-form-row-2-group-label">Mon ingredient</Form.Label>
        <InputGroup className="CreateRecipe-form-row-3-text">
          <InputGroup.Text>{ingredientName}</InputGroup.Text>
          <InputGroup.Text>{quantity}</InputGroup.Text>
          <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup>
      </Row>
      <ModalIngredient
        handleClose={handleClose}
        show={show}
      />
      { renderIngredient()}
      <Row className="mb-3 CreateRecipe-form-row-3-card-container">
        {ingredientList()}
      </Row>
      <Button className="CreateRecipe-button" type="button" onClick={() => { viewFour(); }}>Etape 4</Button>

    </section>
  );
}

export default StepThreeEdit;
