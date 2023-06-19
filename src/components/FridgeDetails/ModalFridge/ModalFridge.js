import './ModalFridge.scss';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function ModalFridge({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} className="Modal">
      <Modal.Header closeButton className="Modal-header">
        <Modal.Title>Ingrédient</Modal.Title>
        <Modal.Title>Quantité</Modal.Title>
      </Modal.Header>
      <Modal.Body className="Modal-body">
        <Form.Control type="text" placeholder="Normal text" />
        <Form.Control type="text" placeholder="Normal text" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalFridge.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalFridge;
