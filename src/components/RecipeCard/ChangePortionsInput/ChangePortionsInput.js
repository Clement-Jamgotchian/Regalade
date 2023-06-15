// React components
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPerson, faPlus } from '@fortawesome/free-solid-svg-icons';

// Styles import
import './ChangePortionsInput.scss';

function handleChangePortionsSubmit(recipeId, portionsInput) {
  axios.put(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/${recipeId}`, {
    portions: portionsInput,
  })
    .catch((error) => console.log(error));
}

function ChangePortionsInput({ recipeId, portions }) {
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';
  const [portionsInput, setPortionsInput] = useState(portions);
  let newValue = 0;

  if (isInPageList) {
    return (
      <Form>
        <InputGroup className="RecipeCard--portionsInput mb-3">
          <Button
            variant="info"
            onClick={(e) => {
              e.preventDefault();
              if (portionsInput > 0) {
                newValue = portionsInput - 1;
                setPortionsInput(newValue);
              }
              handleChangePortionsSubmit(recipeId, newValue);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Form.Control
            value={portionsInput}
            readOnly={portionsInput}
            onClick={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              e.preventDefault();
            }}
          />
          <FontAwesomeIcon icon={faPerson} />
          <Button
            variant="info"
            onClick={(e) => {
              e.preventDefault();
              newValue = portionsInput + 1;
              setPortionsInput(newValue);
              handleChangePortionsSubmit(recipeId, newValue);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
      </Form>
    );
  }
}

ChangePortionsInput.propTypes = {
  recipeId: PropTypes.number.isRequired,
  portions: PropTypes.number,
};

ChangePortionsInput.defaultProps = {
  portions: 1,
};

handleChangePortionsSubmit.propTypes = {
  recipeId: PropTypes.number.isRequired,
  portions: PropTypes.number.isRequired,
};

export default ChangePortionsInput;
