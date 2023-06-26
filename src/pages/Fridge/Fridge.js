import './Fridge.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Pagination from '../../components/Pagination/Pagination';

import fridgeLogo from '../../assets/images/frigo.png';
import closetLogo from '../../assets/images/placard.png';
import FridgeDetails from '../../components/FridgeDetails/FridgeDetails';
import { setFridgeValue, setSuggestedRecipes } from '../../actions/fridge';
import AxiosPrivate from '../../utils/AxiosPrivate';
import ModalFridge from '../../components/FridgeDetails/ModalFridge/ModalFridge';
import Recipes from '../../components/Recipes/Recipes';

function Fridge() {
  const [fridgeData, setFridgeData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useDispatch();

  const closet = fridgeData.filter((noCold) => noCold.ingredient.isCold === false);
  const fridge = fridgeData.filter((cold) => cold.ingredient.isCold === true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getFridge = () => {
    AxiosPrivate.get('/fridge')
      .then((response) => {
        dispatch(setFridgeValue(response.data));
        setFridgeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteIngredient = (id) => {
    AxiosPrivate.delete(`/fridge/${id}`)
      .then(() => {
        getFridge();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFridgeData = (updatedData, id) => {
    const currentQuantity = updatedData.find((quantity) => quantity.ingredient.id === id).quantity;
    const number = Number(currentQuantity);
    AxiosPrivate.put(`/fridge/${id}`, {
      quantity: number,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateQuantity = (newQuantity, ingredientId) => {
    const updatedData = fridgeData.map((item) => {
      if (item.ingredient.id === ingredientId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setFridgeData(updatedData);
    updateFridgeData(updatedData, ingredientId);
  };

  const generateRecipes = () => {
    AxiosPrivate.get('/fridge/suggestion')
      .then((res) => {
        setRecipes(res.data.recipes.map((recipe) => recipe.recipe));
        dispatch(setSuggestedRecipes(res.data.recipes));
        setPageCount(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFridge();
  }, []);

  return (
    <Container className="Fridge">
      <Row className="Fridge-container">
        <Col className="Fridge-closet">
          <h3 className="Fridge-Title">
            Dans le frigo
            <img
              src={fridgeLogo}
              alt="Logo d'un frigo de couleur orange"
              className="Fridge-img"
            />
          </h3>
          <FridgeDetails
            fridgeData={fridge}
            handleDeleteIngredient={handleDeleteIngredient}
            getFridge={getFridge}
            updateQuantity={updateQuantity}
          />
        </Col>
        <Col className="Fridge-closet">
          <h3 className="Fridge-Title">
            Dans les placards
            <img
              src={closetLogo}
              alt="Logo d'un frigo de couleur orange"
              className="Fridge-img"
            />
          </h3>
          <FridgeDetails
            fridgeData={closet}
            handleDeleteIngredient={handleDeleteIngredient}
            getFridge={getFridge}
            updateQuantity={updateQuantity}
          />
        </Col>
      </Row>
      <div>
        <Button variant="outline-primary" onClick={handleShow}>
          Ajouter un ingrédient
        </Button>
      </div>
      <Button
        className="Fridge-button"
        variant="primary"
        size="lg"
        onClick={() => {
          generateRecipes();
        }}
      >
        Générer une liste de recette
      </Button>
      <ModalFridge
        handleClose={handleClose}
        show={show}
        getFridge={getFridge}
      />
      <Container className="Fridge-suggest">
        <Recipes recipes={recipes} generateRecipes={generateRecipes} />
        <Pagination setRecipes={setRecipes} pageCount={pageCount} className="Fridge-suggest-page" />
      </Container>
    </Container>
  );
}

export default Fridge;
