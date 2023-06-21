import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './FridgeDetails.scss';
import fleche from '../../assets/images/fleche.png';
import ModalFridge from './ModalFridge/ModalFridge';

function FridgeDetails({ fridgeData, handleDeleteIngredient, getFridge, updateQuantity }) {
  const [show, setShow] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sliceTest = isSeeMore ? fridgeData : fridgeData.slice(0, 3);

  return (
    <div className="FridgeDetails">
      <Table hover className="FridgeDetails-table">
        <thead className="FridgeDetails-titles">
          <tr>
            <th aria-label="arrow" />
            <th>Ingrédient</th>
            <th>Quantité</th>
            <th>Unité</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        {sliceTest.map(({ ingredient, id, quantity }) => (
          <tbody key={id}>
            <tr>
              <td>
                <img
                  className="FridgeDetails-img"
                  src={fleche}
                  alt="Flèche vers la droite"
                />
              </td>
              <td>{ingredient.name}</td>
              <td>
                <from>
                  <input
                    className="FridgeDetails-input"
                    id={id}
                    value={quantity}
                    onChange={(event) => {
                      updateQuantity(event.currentTarget.value, ingredient.id);
                    }}
                    type="number"
                  />
                </from>
              </td>
              <td>{ingredient.unit}</td>
              <td>
                <button
                  type="button"
                  className="FridgeDetails-button"
                  aria-label="croix de fermeture"
                  onClick={() => {
                    handleDeleteIngredient(ingredient.id);
                    getFridge();
                  }}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <div className="FridgeDetails-add">
        <Button variant="outline-primary" onClick={handleShow}>
          Ajouter
        </Button>
        <Button
          variant="success"
          onClick={() => {
            setIsSeeMore(!isSeeMore);
          }}
        >
          {isSeeMore ? 'Réduire' : 'Voir plus'}
        </Button>
      </div>
      <ModalFridge handleClose={handleClose} show={show} getFridge={getFridge} />
    </div>
  );
}

FridgeDetails.propTypes = {
  fridgeData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isCold: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      unit: PropTypes.string.isRequired,
      department: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  getFridge: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,

};

export default FridgeDetails;
