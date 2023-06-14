// React components
import PropTypes from 'prop-types';
import {
  Button, Card, Form, InputGroup,
} from 'react-bootstrap';
import { useState } from 'react';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// Assets
import vegetables from '../../assets/vegetables.png';

// Import styles
import './IngredientCard.scss';
import { changeIngredientQuantity } from '../../actions/cart';

function IngredientCard({ ingredient, quantity }) {
  const [quantityValue, setQuantityValue] = useState(quantity);
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
                  setQuantityValue(quantityValue - 1);
                  changeIngredientQuantity(ingredient.id, quantityValue);
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
                setQuantityValue(quantityValue + 1);
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
