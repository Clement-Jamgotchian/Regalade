// React components
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

// Import FontAwesome
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Local components
import Department from '../Department/Department';

// Import styles
import './Ingredients.scss';
import { setcartDeleted } from '../../actions/cart';

function Ingredients({ departments, ingredients }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCart = async () => {
    await axios.delete('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/cart')
      .then(() => {
        dispatch(setcartDeleted());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Ingredients">
      <Button
        variant="danger"
        className="Ingredients--deleteButton border ms-auto"
        onClick={(e) => {
          e.preventDefault();
          handleShow();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
        &nbsp;Vider ma liste de courses
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sûr ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tous les ingrédients seront supprimés.
          <br />
          Vous pourrez régénérer une nouvelle liste de courses depuis votre liste de repas.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              deleteCart();
            }}
          >
            Oui je veux vider ma liste !
          </Button>
        </Modal.Footer>
      </Modal>
      {ingredients && (
        <>
          {Array.from(departments).map((department) => (
            <Department key={department} department={department} ingredients={ingredients} />
          ))}
        </>
      )}
    </div>
  );
}

Ingredients.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    department: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isCold: PropTypes.bool.isRequired,
      unit: PropTypes.string.isRequired,
      department: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

export default Ingredients;
