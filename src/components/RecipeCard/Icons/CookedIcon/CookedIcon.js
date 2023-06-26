// React components
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

// Styles import
import './CookedIcon.scss';
import { Button, Modal } from 'react-bootstrap';
import AxiosPrivate from '../../../../utils/AxiosPrivate';
import { updateRecipesList } from '../../../../actions/list';

// If user is logged in, we show the cooked icon
function CookedIcon({ recipeId }) {
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-repas';
  const dispatch = useDispatch();

  const cleanFridge = () => {
    AxiosPrivate.post(`/fridge/clean/${recipeId}`)
      .then(() => {
        dispatch(updateRecipesList({ action: 'removed' }));
      })
      .catch((error) => console.log(error));
  };

  if (isLoggedIn && isInPageList) {
    return (
      <>
        <button
          className="CookedIcon"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faUtensils} size="xl" />
        </button>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Êtes-vous sûr ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            La recette sera supprimée de votre liste de repas, et
            tous les ingrédients de cette recette seront supprimés de votre frigo.
            <br />
            Voulez-vous continuer ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
            >
              Non
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
                cleanFridge();
              }}
            >
              Oui !
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

CookedIcon.propTypes = {
  recipeId: PropTypes.number.isRequired,
};

export default CookedIcon;
