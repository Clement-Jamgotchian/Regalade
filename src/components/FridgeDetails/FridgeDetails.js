import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import './FridgeDetails.scss';
import fleche from '../../assets/images/fleche.png';
import ModalFridge from './ModalFridge/ModalFridge';

function FridgeDetails() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="FridgeDetails">
      <div className="FridgeDetails-titles">
        <p>Ingrédients</p>
        <p>Quantité</p>
        <p>Unité</p>
        <p>Supprimer</p>
      </div>
      <div className="FridgeDetails-form">
        <img
          className="FridgeDetails-img"
          src={fleche}
          alt="Flèche vers la droite"
        />
        <p className="FridgeDetails-ingredient">Tomates</p>
        <input className="FridgeDetails-input" />
        <p className="FridgeDetails-unit">cl</p>
        <button
          type="button"
          className="FridgeDetails-button"
          aria-label="croix de fermeture"
        />
      </div>
      <div className="FridgeDetails-add">
        <Button variant="outline-primary" onClick={handleShow}>
          Ajouter
        </Button>
        <Button variant="success">Voir plus</Button>
      </div>
      <ModalFridge handleClose={handleClose} show={show} />
    </div>
  );
}

export default FridgeDetails;
