// React components
import { useState } from 'react';
import { Alert, Button, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Import FontAwesome
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Local components
import { faBasketShopping, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import Department from '../Department/Department';
import AxiosPrivate from '../../utils/AxiosPrivate';

// Import styles
import './Ingredients.scss';

// Import Redux actions
import { clearCartDeleted, setcartDeleted, updateCart } from '../../actions/cart';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../actions/list';

function Ingredients({ departments, ingredients }) {
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const show = useSelector((state) => state.list.showAlert);
  const [showSendToFridgeModal, setShowSendToFridgeModal] = useState(false);
  const [showDeleteCartModal, setShowDeleteCartModal] = useState(false);
  const dispatch = useDispatch();

  const handleCloseSendToFridge = () => setShowSendToFridgeModal(false);
  const handleCloseDeleteCart = () => setShowDeleteCartModal(false);

  const handleShowSendToFridge = () => setShowSendToFridgeModal(true);
  const handleShowDeleteCart = () => setShowDeleteCartModal(true);

  const generateCart = async () => {
    await AxiosPrivate
      .post(
        '/cart',
      )
      .then((response) => {
        dispatch(clearCartDeleted());
        console.log(response.data);
        if (response.data.length === 1) {
          dispatch(newAlertMessage('Vous avez déjà tout ce dont vous avez besoin dans votre frigo !'));
        } else {
          dispatch(newAlertMessage('Votre liste de courses a bien été générée !'));
        }
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
      })
      .catch((error) => {
        dispatch(newAlertMessage(error));
        dispatch(changeAlertVariant('danger'));
        dispatch(showOrHideAlert(true));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      });
  };

  const sendToFridge = async () => {
    await AxiosPrivate
      .post(
        '/cart/to-fridge',
      )
      .then(() => {
        dispatch(updateCart());
        dispatch(newAlertMessage('Vos courses ont bien été rangées deans votre frigo !'));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      })
      .catch((error) => {
        dispatch(newAlertMessage(error));
        dispatch(changeAlertVariant('danger'));
        dispatch(showOrHideAlert(true));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '4000');
      });
  };

  const deleteCart = async () => {
    await AxiosPrivate.delete('/cart')
      .then(() => {
        dispatch(setcartDeleted());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Ingredients">
      {show && (
        <Alert
          variant={alertVariant}
          onClose={() => dispatch(showOrHideAlert(false))}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      {ingredients.length > 0 ? (
        <>
          <Stack direction="horizontal" gap={3}>
            <Button
              variant="primary"
              className="Ingredients--generateCartButton border"
              onClick={(e) => {
                e.preventDefault();
                handleShowSendToFridge();
              }}
            >
              <FontAwesomeIcon icon={faBasketShopping} />
              Ranger mes courses
            </Button>
            <Modal show={showSendToFridgeModal} onHide={handleCloseSendToFridge} centered>
              <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr ?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Tous les ingrédients seront ajoutés à votre frigo et
                la liste de courses sera supprimée.
                <br />
                Voulez-vous continuer ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSendToFridge}>
                  Non
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleCloseSendToFridge();
                    sendToFridge();
                  }}
                >
                  Oui !
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              variant="danger"
              className="Ingredients--deleteButton border ms-auto"
              onClick={(e) => {
                e.preventDefault();
                handleShowDeleteCart();
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
        &nbsp;Vider ma liste de courses
            </Button>
          </Stack>
          <Modal show={showDeleteCartModal} onHide={handleCloseDeleteCart} centered>
            <Modal.Header closeButton>
              <Modal.Title>Êtes-vous sûr ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tous les ingrédients seront supprimés.
              <br />
              Vous pourrez régénérer une nouvelle liste de courses depuis votre liste de repas.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteCart}>
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseDeleteCart();
                  deleteCart();
                }}
              >
                Oui je veux vider ma liste !
              </Button>
            </Modal.Footer>
          </Modal>
          {Array.from(departments).map((department) => (
            <Department key={department} department={department} ingredients={ingredients} />
          ))}
        </>
      )
        : (
          <Button
            variant="primary"
            className="Ingredients--generateCartButton border"
            onClick={(e) => {
              e.preventDefault();
              generateCart();
              dispatch(updateCart());
            }}
          >
            <FontAwesomeIcon icon={faCartArrowDown} />
            Générer ma liste de courses
          </Button>
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
