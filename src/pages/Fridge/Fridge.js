import './Fridge.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import fridgeLogo from '../../assets/images/frigo.png';
import closetLogo from '../../assets/images/placard.png';
import FridgeDetails from '../../components/FridgeDetails/FridgeDetails';

function Fridge() {
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
          <FridgeDetails />
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
          <FridgeDetails />
        </Col>
      </Row>
      <Button className="Fridge-button" variant="primary" size="lg">
        Block level button
      </Button>
    </Container>
  );
}

export default Fridge;
