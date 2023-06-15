// React components
import PropTypes from 'prop-types';
import {
  Button, Card, Form, InputGroup,
} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// Assets
import vegetables from '../../assets/vegetables.png';

// Import styles
import './IngredientCard.scss';

function IngredientCard({ ingredient, quantity }) {
  const [quantityValue, setQuantityValue] = useState(quantity);
  let newValue = 0;

  const updateIngredientQuantity = async (ingredientId, newQuantity) => {
    await axios.post(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart/${ingredientId}`, {
      quantity: newQuantity,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className="IngredientCard mb-2">
      <Card.Img className="IngredientCard--image" variant="left" src={vegetables} />
      <Card.Body className="IngredientCard--content">
        <Card.Title className="IngredientCard--title">{ingredient.name}</Card.Title>
        <Form>
          <InputGroup className="IngredientCard--quantity" size="sm">
            <Button
              variant="success"
              onClick={(e) => {
                e.preventDefault();
                if (quantityValue > 0) {
                  newValue = quantityValue - 1;
                  setQuantityValue(newValue);
                  updateIngredientQuantity(ingredient.id, newValue);
                }
              }}
            >
              <FontAwesomeIcon icon={faMinus} size="xs" />
            </Button>
            <Form.Control
              value={quantityValue}
              readOnly={quantityValue}
              onClick={(e) => {
                e.preventDefault();
              }}
              onChange={(e) => {
                e.preventDefault();
              }}
            />
            <span>{ingredient.unit}</span>
            <Button
              variant="success"
              onClick={(e) => {
                e.preventDefault();
                newValue = quantityValue + 1;
                setQuantityValue(newValue);
                updateIngredientQuantity(ingredient.id, newValue);
              }}
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>

    </Card>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isCold: PropTypes.bool.isRequired,
    unit: PropTypes.string.isRequired,
    department: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default IngredientCard;
