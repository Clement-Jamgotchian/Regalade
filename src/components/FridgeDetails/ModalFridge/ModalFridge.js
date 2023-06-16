import { useEffect, useState } from 'react';
import './ModalFridge.scss';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import axios from 'axios';

function ModalFridge({ show, handleClose }) {
  const [isOpenList, setIsOpenList] = useState(false);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [ingredient, setIngredient] = useState('');
  const smallIngredients = ingredient.slice(0, 5);
  const baseUrl = 'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/ingredients';
  const request = searchIngredient !== undefined && searchIngredient !== '' ? `?search=${searchIngredient}` : '';

  const getRecipes = async () => {
    axios
      .get(baseUrl + request)
      .then((response) => {
        setIngredient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [searchIngredient]);

  const handleAddIngredient = () => {
    axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/fridge',
        {
          ingredient: searchIngredient,
          quantity: inputValue,
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterInputText = (evt) => {
    const filteredValue = evt.replace(/([-'`~!@#$%^&*(){}_|+=?;:'",.<>\\[\]\\/0-9])/gi, '');
    setSearchIngredient(filteredValue);
  };

  const filterInputNumber = (evt) => {
    const filteredValue = evt.replace(/[^0-9]+/g, '');
    setInputValue(filteredValue);
    console.log(evt);
  };

  return (
    <Modal show={show} onHide={handleClose} className="Modal" centered>
      <Modal.Header closeButton className="Modal-header">
        <Modal.Title>Ingrédient</Modal.Title>
        <Modal.Title>Quantité</Modal.Title>
      </Modal.Header>
      <Modal.Body className="Modal-body">
        <Form.Control
          type="text"
          value={searchIngredient}
          onClick={() => {
            setIsOpenList(!isOpenList);
          }}
          onChange={(evt) => {
            setIsOpenList(true);
            filterInputText(evt.target.value);
          }}
        />
        <Form.Control type="number" value={inputValue} onChange={(evt) => { filterInputNumber(evt.target.value); }} />
        {isOpenList && (
          <ListGroup
            className="Modal-list"
            onClick={(evt) => {
              setIsOpenList(false);
              setSearchIngredient(evt.target.textContent);
            }}
          >
            {smallIngredients
              .filter((ingredients) => ingredients.name.includes(searchIngredient))
              .map((filtered) => (
                <ListGroup.Item action key={filtered.id}>
                  {filtered.name}
                </ListGroup.Item>
              ))}
            <ListGroup.Item action>
              L&apos;ingrédient n&apos;éxiste pas ?
            </ListGroup.Item>
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            setSearchIngredient('');
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleAddIngredient}>
          Ajouter
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
