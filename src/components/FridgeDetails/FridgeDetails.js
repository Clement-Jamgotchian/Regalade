import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import './FridgeDetails.scss';
import fleche from '../../assets/images/fleche.png';
import ModalFridge from './ModalFridge/ModalFridge';

const test = [
  {
    id: 1,
    title: 'Carotte',
    unit: 'cl',
    quantity: 50,
  },
  {
    id: 2,
    unit: 'cl',
    quantity: 10,
    title: 'Pain',
  },
  {
    id: 3,
    unit: 'cl',
    quantity: 50,
    title: 'Fromage',
  },
  {
    id: 4,
    unit: 'kg',
    quantity: 30,
    title: 'Choux',
  },
  {
    id: 5,
    unit: 'kg',
    quantity: 20,
    title: 'Noix',
  },
  {
    id: 6,
    unit: 'cl',
    quantity: 50,
    title: 'test',
  },
];
function FridgeDetails() {
  const [show, setShow] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [quantityValue, setQuantityValue] = useState(null);
  const [inputId, setInputId] = useState(null);
  const [indexId, setIndexId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sliceTest = isSeeMore ? test : test.slice(0, 3);
  // const current
  console.log(quantityValue);

  const changeValue = (newValue) => {
    if (indexId + 1 === inputId) {
      setQuantityValue(newValue);
    }
  };

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
        {sliceTest.map(({ title, id, unit, quantity }, i) => (
          <tbody key={id}>
            <tr>
              <td>
                <img
                  className="FridgeDetails-img"
                  src={fleche}
                  alt="Flèche vers la droite"
                />
              </td>
              <td>{title}</td>
              <td>
                <from>
                  <input
                    className="FridgeDetails-input"
                    id={id}
                    value={quantity}
                    onChange={(event) => {
                      setInputId(event.currentTarget.id);
                      setIndexId(i);
                      changeValue(event.currentTarget.value);
                    }}
                    type="number"
                  />
                </from>
              </td>
              <td>{unit}</td>
              <td>
                <button
                  type="button"
                  className="FridgeDetails-button"
                  aria-label="croix de fermeture"
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
      <ModalFridge handleClose={handleClose} show={show} />
    </div>
  );
}

export default FridgeDetails;
