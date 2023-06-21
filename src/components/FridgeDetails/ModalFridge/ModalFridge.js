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

function ModalFridge({ show, handleClose, getFridge }) {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isFullModal, setIsFullModal] = useState(false);
  const [isFridge, setIsFridge] = useState(false);

  const [allUnits, setAllUnits] = useState([]);
  const [newUnit, setNewUnit] = useState('');
  const [searchIngredient, setSearchIngredient] = useState('');
  const [ingredientById, setIngredientById] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const smallIngredients = ingredient.slice(0, 5);
  const currentFridge = useSelector((state) => state.fridge.fridge);

  const numberDepartment = Number(departmentId);
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
  const handleAddIngredient = (quant, ingre) => {
    if (searchIngredient === '' || inputValue === '') {
      return;
    }

    const currentSearch = !ingre ? ingredientById : ingre;
    const currentQuantity = !quant ? numberValue : quant;

    console.log(currentSearch, currentQuantity);
    axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/fridge',
        {
          ingredient: currentSearch,
          quantity: currentQuantity,
        },
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchIngredientsList = (quant) => {
    axios.get(baseUrl)
      .then((response) => {
        const idNewIngredients = response.data.find((fruit) => fruit.name === searchIngredient).id;
        handleAddIngredient(quant, idNewIngredients);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // create a new ingrédient
  const handleNewIngredient = () => {
    if (searchIngredient === '') {
      return;
    }
    const currentQuantity = numberValue;
    axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/ingredients',
        {
          name: searchIngredient,
          isCold: isFridge,
          unit: newUnit,
          department: numberDepartment,
        },
      )
      .then((response) => {
        console.log(response.data);
        fetchIngredientsList(currentQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllUnits = () => {
    axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/departments')
      .then((response) => {
        setAllUnits(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllUnits();
  }, []);

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
  const handleDepartement = (evt) => {
    if (evt.target.value !== 'Quel rayon ?') {
      setDepartmentId(evt.target.value);
    }
  };

  const renderFridge = () => {
    const findInDrige = currentFridge.length > 0
      ? currentFridge.find((fridge) => fridge.ingredient.id === numberIngreId) : null;
    if (!searchIngredient) {
      return null;
    }

    if (findInDrige && searchIngredient.length > 3) {
      return (
        <Alert bg="alert">
          Ingrédient déjà dans le frigo !
        </Alert>
      );
    }

    return null;
  };

  return (
    <Modal show={show} onHide={handleClose} className="Modal" centered>
      <Modal.Header
        closeButton
        className="Modal-header"
        onClick={() => {
          setIsFullModal(false);
          setIsOpenList(false);
          setSearchIngredient('');
          setInputValue('');
        }}
      >
        <Modal.Title>Ingrédient</Modal.Title>
        <Modal.Title>Quantité</Modal.Title>
      </Modal.Header>
      <Modal.Body className="Modal-body">
        <div className="Modal-alert">{renderFridge()}</div>
        <Form.Control
          type="text"
          value={searchIngredient}
          onChange={(evt) => {
            setIsOpenList(true);
            setIsFullModal(false);
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
              isrequired
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
              isrequired
              onClick={(evt) => {
                handleUnit(evt);
              }}
            >
              <option>Quelle unité ?</option>
              <option value="cl">cl</option>
              <option value="pce">pce</option>
              <option value="gr">gr</option>
            </Form.Select>
            <Form.Select
              aria-label="Select department"
              isrequired
              onClick={(evt) => {
                handleDepartement(evt);
              }}
            >
              <option>Quel rayon ?</option>
              {allUnits.map((unit) => (
                <option
                  value={unit.id}
                >
                  {unit.name}
                </option>
              ))}
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
              <>
                {smallIngredients
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
                  ))}
                <ListGroup.Item
                  action
                  onClick={(evt) => {
                    handleCreateIngredient(evt);
                  }}
                >
                  L&apos;ingrédient n&apos;existe pas ?
                </ListGroup.Item>
              </>

            ) : (
              <ListGroup.Item
                action
                onClick={(evt) => {
                  handleCreateIngredient(evt);
                }}
              >
                L&apos;ingrédient n&apos;existe pas ?
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
              setInputValue('');
              getFridge();
              setIsFullModal(false);
              setIsOpenList(false);
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
              setInputValue('');
              getFridge();
              setIsOpenList(false);
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
  getFridge: PropTypes.func.isRequired,

};

export default ModalFridge;
