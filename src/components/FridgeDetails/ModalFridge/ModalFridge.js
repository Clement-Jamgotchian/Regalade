import { useEffect, useState } from 'react';
import './ModalFridge.scss';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ModalFridge({ show, handleClose }) {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isFullModal, setIsFullModal] = useState(false);
  const [isFridge, setIsFridge] = useState(false);

  const [newUnit, setNewUnit] = useState('');
  const [searchIngredient, setSearchIngredient] = useState('');
  const [ingredientById, setIngredientById] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [ingredient, setIngredient] = useState('');

  const smallIngredients = ingredient.slice(0, 5);
  const currentFridge = useSelector((state) => state.fridge.fridge);

  const numberIngreId = Number(ingredientById);
  const numberValue = Number(inputValue);

  const baseUrl = 'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/ingredients';
  const request = searchIngredient !== undefined && searchIngredient !== ''
    ? `?search=${searchIngredient}`
    : '';

  const getRecipes = async () => {
    axios
      .get(baseUrl + request)
      .then((response) => {
        if (!response || response.length === 0) {
          setIngredient('');
        }
        setIngredient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [searchIngredient]);

  // Add a new ingrédient
  const handleAddIngredient = () => {
    axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/fridge',
        {
          ingredient: ingredientById,
          quantity: numberValue,
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // create a new ingrédient
  const handleNewIngredient = () => {
    axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/ingredients',
        {
          name: searchIngredient,
          isCold: isFridge,
          unit: newUnit,
          department: 85,
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Remove all spécial characters and numbers from the input
  const filterInputText = (evt) => {
    const filteredValue = evt.replace(/([-'`~!@#$%^&*(){}_|+=?;:'",.<>\\[\]\\/0-9])/gi, '');
    setSearchIngredient(filteredValue);
  };
  // Remove everithing except numbers
  const filterInputNumber = (evt) => {
    const filteredValue = evt.replace(/[^0-9]+/g, '');
    setInputValue(filteredValue);
  };

  const handleCreateIngredient = (evt) => {
    evt.preventDefault();
    setIsFullModal(!isFullModal);
  };

  const handleStorage = (evt) => {
    if (evt.target.value === '1') {
      setIsFridge(!isFridge);
    }
    if (evt.target.value === '2') {
      setIsFridge(false);
    }
  };

  const handleUnit = (evt) => {
    if (evt.target.value !== "Choisi l'unité") {
      setNewUnit(evt.target.value);
    }
  };

  const renderFridge = () => {
    const findInDrige = currentFridge.find((fridge) => fridge.ingredient.id === numberIngreId);

    if (findInDrige) {
      return (
        <Alert variant="alert">
          Ingrédient déjà dans le frigo !
        </Alert>
      );
    }

    return null;
  };

  return (
    <Modal show={show} onHide={handleClose} className="Modal" centered>
      <Modal.Header closeButton className="Modal-header">
        <Modal.Title>Ingrédient</Modal.Title>
        <Modal.Title>Quantité</Modal.Title>
      </Modal.Header>
      <Modal.Body className="Modal-body">
        <div>{renderFridge()}</div>
        <Form.Control
          type="text"
          value={searchIngredient}
          onChange={(evt) => {
            setIsOpenList(true);
            filterInputText(evt.target.value);
          }}
        />
        <Form.Control
          type="number"
          value={inputValue}
          onChange={(evt) => {
            filterInputNumber(evt.target.value);
          }}
        />
        {isFullModal && (
          <div className="Modal-select">
            <Form.Select
              aria-label="Select closet/fridge"
              isRequired
              onClick={(evt) => {
                handleStorage(evt);
              }}
            >
              <option>Ou se range t-il ?</option>
              <option value="1">Dans le frigo</option>
              <option value="2">Dans les placards</option>
            </Form.Select>
            <Form.Select
              aria-label="Select unit"
              isRequired
              onClick={(evt) => {
                handleUnit(evt);
              }}
            >
              <option>Choisi l&apos;unité</option>
              <option value="cl">cl</option>
              <option value="pce">pce</option>
              <option value="gr">gr</option>
            </Form.Select>
            <Form.Select
              aria-label="Select unit"
              isRequired
              onClick={(evt) => {
                handleUnit(evt);
              }}
            >
              <option>Quel rayon ?</option>
              <option value="cl">cl</option>
              <option value="pce">pce</option>
              <option value="gr">gr</option>
            </Form.Select>
          </div>
        )}
        {isOpenList && (
          <ListGroup
            className="Modal-list"
            onClick={() => {
              setIsOpenList(false);
            }}
          >
            {smallIngredients.length > 0 ? (
              smallIngredients
                .filter((ingredients) => ingredients.name.includes(searchIngredient))
                .map((filtered) => (
                  <ListGroup.Item
                    key={filtered.id}
                    id={filtered.id}
                    onClick={(evt) => {
                      setSearchIngredient(evt.target.textContent);
                      setIngredientById(evt.target.id);
                    }}
                  >
                    {`${filtered.name} [${filtered.unit}]`}
                  </ListGroup.Item>
                ))
            ) : (
              <ListGroup.Item
                action
                onClick={(evt) => {
                  handleCreateIngredient(evt);
                }}
              >
                L&apos;ingrédient n&apos;éxiste pas ?
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isFullModal ? (
          <Button
            variant="primary"
            onClick={() => {
              handleNewIngredient();
              handleClose();
              setSearchIngredient('');
              setIsFullModal(false);
            }}
          >
            Ajouter quand même
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              handleAddIngredient();
              handleClose();
              setSearchIngredient('');
            }}
          >
            Ajouter
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

ModalFridge.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalFridge;
