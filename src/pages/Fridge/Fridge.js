import './Fridge.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import fridgeLogo from '../../assets/images/frigo.png';
import closetLogo from '../../assets/images/placard.png';
import FridgeDetails from '../../components/FridgeDetails/FridgeDetails';
import { setFridgeValue } from '../../actions/fridge';

function Fridge() {
  const [fridgeData, setFridgeData] = useState([]);
  const dispatch = useDispatch();
  const closet = fridgeData.filter((noCold) => noCold.ingredient.isCold === false);
  const fridge = fridgeData.filter((cold) => cold.ingredient.isCold === true);

  const getFridge = () => {
    axios
      .get(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/fridge',
      )
      .then((response) => {
        dispatch(setFridgeValue(response.data));
        setFridgeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteIngredient = (id) => {
    axios.delete(`https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/fridge/${id}`)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFridgeData = (updatedData, id) => {
    const currentQuantity = updatedData.find((quantity) => quantity.ingredient.id === id).quantity;
    const number = Number(currentQuantity);
    axios.put(
      `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/fridge/${id}`,
      {
        quantity: number,
      },
    )
      .then((res) => { console.log(res); })
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
      <Button className="Fridge-button" variant="primary" size="lg">
        Block level button
      </Button>
    </Container>
  );
}

export default Fridge;
