// React components
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Option from 'react-bootstrap-typeahead/types/types';
import Button from 'react-bootstrap/Button';
import BsModal from 'react-bootstrap/Modal';
import AxiosPrivate from '../../utils/AxiosPrivate';

function MyRecipesModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [picture, setPicture] = useState('');
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [value, setValue] = useState('');

  const getIngredients = async () => {
    await AxiosPrivate.get('/ingredients')
      .then((response) => {
        const { data } = response;
        const ingredientsName = response.data.map((item) => {
          labelKey: item.name,
          id: item.id,
        });
        setIngredients(ingredientsName);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await AxiosPrivate.post('/recipes/my', {
      picture,
      ingredients,
    })
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPicture(base64);
  };

  return (
    <BsModal show={show} onHide={handleClose} centered>
      <BsModal.Header closeButton>
        <BsModal.Title>Créer une nouvelle recette</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label className="text-center w-100" column>
            Titre
          </Form.Label>
          <Form.Control type="text" id="title" name="title" />
          <Form.Label className="text-center w-100" column>
            Photo
          </Form.Label>
          <Form.Control
            className="MyInfos-row-group-input"
            type="file"
            label="Image"
            name="recipePicture"
            accept=".jpeg, .png, .jpg"
            id="file"
            onChange={(e) => handleFileUpload(e)}
            required
          />
          <Form.Label className="text-center w-100" column>
            Nombre de personnes
          </Form.Label>
          <Form.Control type="number" id="portions" name="portions" />
          <Form.Label className="text-center w-100" column>
            Type de plats
          </Form.Label>
          <Form.Check
            type="radio"
            id="category-Entrée"
            name="category-Entrée"
            label="Entrée"
          />
          <Form.Check
            type="radio"
            id="category-Plat"
            name="category-Plat"
            label="Plat"
          />
          <Form.Check
            type="radio"
            id="category-Dessert"
            name="category-Dessert"
            label="Dessert"
          />
          <Form.Label className="text-center w-100" column>
            Type de plats
          </Form.Label>
          <Form.Check
            type="radio"
            id="difficulty-0"
            name="difficulty-0"
            label="Facile"
          />
          <Form.Check
            type="radio"
            id="difficulty-1"
            name="difficulty-1"
            label="Moyen"
          />
          <Form.Check
            type="radio"
            id="difficulty-2"
            name="difficulty-2"
            label="Difficile"
          />
          <Form.Label className="text-center w-100" column>
            Temps
          </Form.Label>
          <Row>
            <Col>
              <Form.Label column>
                Préparation
              </Form.Label>
              <Form.Control type="number" id="setupDuration" name="setupDuration" />
            </Col>
            <Col />
            <Col>
              <Form.Label column>
                Cuisson
              </Form.Label>
              <Form.Control type="number" id="cookingDuration" name="cookingDuration" />
            </Col>
          </Row>
          <Form.Label className="text-center w-100" column>
            Ingrédients
          </Form.Label>
          <Typeahead
            allowNew
            newSelectionPrefix="Ajouter un nouvel ingrédient: "
            id="containsIngredients"
            onChange={(e) => {
              setIngredientsSelected([...ingredientsSelected, value]);
              setValue(e);
            }}
            options={ingredients}
            renderMenuItemChildren={(option) => (
              <div>
                {option.name}
                <div>
                  <small>
                    ID:
                    {' '}
                    {option.id}
                  </small>
                </div>
              </div>
            )}
            selected={value}
          />
          <Card>
            <ul>
              {ingredientsSelected.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Form.Label className="text-center w-100" column>
            Étapes
          </Form.Label>
          <Form.Control as="textarea" aria-label="steps" />
        </Form>
      </BsModal.Body>
      <BsModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Sauvegarder
        </Button>
      </BsModal.Footer>
    </BsModal>
  );
}

MyRecipesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default MyRecipesModal;
