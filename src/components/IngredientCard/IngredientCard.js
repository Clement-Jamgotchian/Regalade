// React components
import PropTypes from 'prop-types';
import {
  Button, Card, Form, InputGroup,
} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

// Assets
import vegetables from '../../assets/vegetables.png';

// Import styles
import './IngredientCard.scss';
import { updateCart } from '../../actions/cart';

// Axios
import AxiosPrivate from '../../utils/AxiosPrivate';

function IngredientCard({ ingredient, quantity }) {
  const [quantityValue, setQuantityValue] = useState(quantity);
  const dispatch = useDispatch();
  let newValue = 0;

  const updateIngredientQuantity = async (ingredientId, newQuantity) => {
    await AxiosPrivate.put(`/cart/${ingredientId}`, {
      quantity: newQuantity,
    })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteIngredient = async (ingredientId) => {
    await AxiosPrivate.delete(`/cart/${ingredientId}`)
      .then(() => {
        dispatch(updateCart());
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
          <Button
            variant="info"
            onClick={(e) => {
              e.preventDefault();
              newValue = 0;
              setQuantityValue(0);
              deleteIngredient(ingredient.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
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
